const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Přidej globální pole pro parkovací místa, pokud ještě neexistuje
let parkingSpots = global.parkingSpots || [];
global.parkingSpots = parkingSpots;

const apiRoutes = require('./api/api');
app.use('/api', apiRoutes); // /api/items

app.delete('/api/misto/:cislo_mista', (req, res) => {
    const id = String(req.params.cislo_mista);

    // Pokud používáš SQLite databázi, použij dotaz do DB místo práce s polem:
    const db = require('./database/db');
    db.run(
        'DELETE FROM parking_spots WHERE cislo_mista = ?',
        [id],
        function (err) {
            if (err) {
                console.error('Chyba při mazání z DB:', err);
                return res.status(500).json({ error: 'Chyba serveru při mazání místa' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Místo nenalezeno' });
            }
            res.json({ success: true });
        }
    );
});

app.listen(3000, () => {
  console.log('Server běží na http://localhost:3000');
});
