const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'garage_parking.sqlite');
const db = new sqlite3.Database(dbPath);

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Chyba při inicializaci databázového schématu:', err.message);
  } else {
    console.log('Databázové schéma pro správu parkovacích míst bylo načteno.');
  }
});

module.exports = db;
