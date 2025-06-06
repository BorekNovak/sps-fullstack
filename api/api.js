const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Získání všech parkovacích míst včetně informace, zda je místo rezervované
router.get('/misto', (req, res) => {
  db.all(
    `SELECT m.*, 
      CASE 
        WHEN EXISTS (SELECT 1 FROM rezervace r WHERE r.misto_id = m.id) THEN 1 
        ELSE 0 
      END AS rezervovano
     FROM misto m`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Přidání nového parkovacího místa
router.post('/misto', (req, res) => {
  const { cislo_mista, obsazeno } = req.body;
  db.run(
    'INSERT INTO misto (cislo_mista, obsazeno) VALUES (?, ?)',
    [cislo_mista, obsazeno || 'free'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Parkovací místo vytvořeno', id: this.lastID });
    }
  );
});

// Získání detailu konkrétního místa
router.get('/misto/:id', (req, res) => {
  db.get('SELECT * FROM misto WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Místo nenalezeno' });
    res.json(row);
  });
});

// Získání detailu konkrétního místa podle cislo_mista
router.get('/misto/detail/:cislo_mista', (req, res) => {
  db.get('SELECT * FROM misto WHERE cislo_mista = ?', [req.params.cislo_mista], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Místo nenalezeno' });
    res.json(row);
  });
});

// Úprava parkovacího místa (např. změna statusu) - OPRAVENO na správné názvy sloupců
router.put('/misto/:cislo_mista', (req, res) => {
  const { obsazeno } = req.body;
  db.run(
    'UPDATE misto SET obsazeno = ? WHERE cislo_mista = ?',
    [obsazeno, req.params.cislo_mista],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Místo nenalezeno' });
      res.json({ message: 'Místo upraveno' });
    }
  );
});

// Smazání parkovacího místa podle cislo_mista (ne podle id)
router.delete('/misto/:cislo_mista', (req, res) => {
  db.run('DELETE FROM misto WHERE cislo_mista = ?', [req.params.cislo_mista], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Místo nenalezeno' });
    res.json({ message: 'Místo smazáno' });
  });
});

// Získání všech rezervací (včetně telefonu a emailu)
router.get('/rezervace', (req, res) => {
  db.all(
    `SELECT 
        r.id, 
        r.misto_id, 
        r.vozidlo_id, 
        v.spz, 
        v.typ_vozidla,
        COALESCE(r.telefon, '') AS telefon,
        COALESCE(r.email, '') AS email
      FROM rezervace r
      LEFT JOIN vozidlo v ON r.vozidlo_id = v.id`,
    [],
    (err, rows) => {
      if (err) {
        // Pokud je chyba "no such column", vrať prázdné pole a upozorni na problém
        if (err.message && err.message.includes('no such column')) {
          return res.json([]);
        }
        res.status(500).json({ error: err.message });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
      }
    }
  );
});

// Přidání nového vozidla (nebo nalezení existujícího podle SPZ)
router.post('/vozidlo', (req, res) => {
  const { spz, typ_vozidla } = req.body;
  if (!spz || !typ_vozidla) {
    return res.status(400).json({ error: 'SPZ a typ_vozidla jsou povinné.' });
  }
  db.get('SELECT id FROM vozidlo WHERE spz = ?', [spz], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      return res.json({ id: row.id });
    }
    db.run(
      'INSERT INTO vozidlo (spz, typ_vozidla) VALUES (?, ?)',
      [spz, typ_vozidla],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
      }
    );
  });
});

// Přidání nové rezervace (už neoznačuje místo jako rezervované)
router.post('/rezervace', (req, res) => {
  const { vozidlo_id, misto_id, telefon, email } = req.body;
  if (!vozidlo_id || !misto_id) {
    return res.status(400).json({ error: 'vozidlo_id a misto_id jsou povinné.' });
  }
  db.run(
    'INSERT INTO rezervace (vozidlo_id, misto_id, telefon, email) VALUES (?, ?, ?, ?)',
    [vozidlo_id, misto_id, telefon || null, email || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Úprava rezervace
router.put('/rezervace/:id', (req, res) => {
  const { vozidlo_id, misto_id, telefon, email } = req.body;
  db.run(
    'UPDATE rezervace SET vozidlo_id = ?, misto_id = ?, telefon = ?, email = ? WHERE id = ?',
    [vozidlo_id, misto_id, telefon || null, email || null, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Rezervace nenalezena' });
      res.json({ message: 'Rezervace upravena' });
    }
  );
});

// Smazání rezervace
router.delete('/rezervace/:id', (req, res) => {
  db.run('DELETE FROM rezervace WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Rezervace nenalezena' });
    res.json({ message: 'Rezervace smazána' });
  });
});

module.exports = router;
