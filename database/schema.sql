CREATE TABLE IF NOT EXISTS vozidlo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  spz TEXT NOT NULL UNIQUE,
  majitel TEXT,
  typ_vozidla TEXT NOT NULL
);

DROP TABLE IF EXISTS rezervace;

CREATE TABLE IF NOT EXISTS rezervace (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vozidlo_id INTEGER NOT NULL,
  misto_id INTEGER NOT NULL,
  telefon TEXT,
  email TEXT,
  datum_od TEXT,
  datum_do TEXT,
  FOREIGN KEY (vozidlo_id) REFERENCES vozidlo(id),
  FOREIGN KEY (misto_id) REFERENCES misto(id)
);

CREATE TABLE IF NOT EXISTS misto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cislo_mista INTEGER NOT NULL UNIQUE,
  obsazeno TEXT
);

-- Pokud stále dostáváš chybu "no column named telefon", databáze nebyla přegenerována.
-- Řešení: Smaž soubor databáze (např. garage_parking.sqlite) a spusť aplikaci znovu,
-- nebo spusť tyto příkazy v sqlite konzoli:

ALTER TABLE rezervace ADD COLUMN telefon TEXT;
ALTER TABLE rezervace ADD COLUMN email TEXT;


