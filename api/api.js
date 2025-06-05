const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Získání všech parkovacích míst
router.get('/misto', (req, res) => {
  db.all('SELECT * FROM misto', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
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

module.exports = router;
