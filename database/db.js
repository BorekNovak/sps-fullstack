const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'garage_parking.sqlite');
const db = new sqlite3.Database(dbPath);

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Po načtení schématu nastav všechna místa, která mají rezervaci, na obsazeno = 'reserved'
db.exec(schema, (err) => {
  if (err) {
    console.error('Chyba při inicializaci databázového schématu:', err.message);
  } else {
    console.log('Databázové schéma pro správu parkovacích míst bylo načteno.');
    // Nastav obsazeno = 'reserved' pro všechna místa, která mají rezervaci
    db.run(
      `UPDATE misto SET obsazeno = 'reserved' WHERE id IN (SELECT misto_id FROM rezervace)`,
      (err2) => {
        if (err2) {
          console.error('Chyba při synchronizaci rezervací s místy:', err2.message);
        }
      }
    );
  }
});

module.exports = db;
