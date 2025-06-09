# API dokumentace

## Parkovací místa

- `GET /api/misto`  
  Vrátí seznam všech parkovacích míst.

- `POST /api/misto`  
  Přidá nové parkovací místo.  
  **Body:** `{ cislo_mista, obsazeno }`

- `PUT /api/misto/:cislo_mista`  
  Změní stav parkovacího místa.  
  **Body:** `{ obsazeno }`

- `DELETE /api/misto/:cislo_mista`  
  Smaže parkovací místo.

- `GET /api/misto/detail/:cislo_mista`  
  Vrátí detail místa podle čísla.

## Rezervace

- `GET /api/rezervace`  
  Vrátí seznam rezervací.

- `POST /api/rezervace`  
  Vytvoří novou rezervaci.  
  **Body:** `{ vozidlo_id, misto_id, telefon, email }`

- `PUT /api/rezervace/:id`  
  Upraví rezervaci.

- `DELETE /api/rezervace/:id`  
  Smaže rezervaci.

## Vozidla

- `POST /api/vozidlo`  
  Přidá nebo najde vozidlo podle SPZ.  
  **Body:** `{ spz, typ_vozidla }`
