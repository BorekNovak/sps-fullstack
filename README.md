# Správa parkovacích míst v garáži
 
Aplikace pro správu parkovacích míst, rezervací a vozidel v garážovém domě. Umožňuje přidávat, upravovat a mazat parkovací místa, spravovat rezervace a evidovat vozidla. Součástí je vizuální rozhraní pro správu i REST API.
 
---
 
## Funkcionality
 
- **CRUD parkovacích míst** – přidání, úprava, mazání, detail, změna stavu (volné/obsazené/rezervované)
- **Rezervace míst** – vytvoření, úprava, mazání rezervace, validace vstupních dat
- **Evidence vozidel** – automatické vytvoření vozidla při rezervaci podle SPZ
- **Detailní informace o autě** – zobrazení detailu auta na obsazeném místě
- **Vizuální grid parkoviště** – přehledné zobrazení míst a jejich stavu
- **Validace dat** – kontrola povinných polí na backendu i ve formuláři
 
---
 
## Struktura projektu
 
```
sps-fullstack/
│   README.md
│   .gitignore
│   package.json
│   server.js
│
├───public
│       index.html
│       rezervace.html
│       assets/         # obrázky, styly (volitelné)
│
├───api
│       api.js          # REST API routy
│
└───database
        db.js           # Připojení k SQLite
        schema.sql      # Definice databázového schématu
        seed.js         # Skript pro naplnění databáze daty
        seed.sql        # SQL data pro seed
```
 
---
 
## Technologie
 
- Node.js + Express (backend, REST API)
- SQLite (databáze)
- HTML, CSS, Vanilla JS (frontend)
- Nodemon (vývoj)
- Vitepress (dokumentace, volitelné)
 
---
 
## Návod na spuštění
 
1. **Nainstalujte závislosti:**
   ```
   npm install
   ```
 
2. **Inicializujte databázi (volitelné, smaže stará data):**
   ```
   node database/seed.js
   ```
 
3. **Spusťte server:**
   ```
   node server.js
   ```
 
4. **Aplikace poběží na adrese:**  
   [http://localhost:3000](http://localhost:3000)
 
---
 
## Hlavní entity
 
- **misto** – parkovací místo (`cislo_mista`, `obsazeno`)
- **vozidlo** – vozidlo (`spz`, `typ_vozidla`)
- **rezervace** – rezervace místa (`vozidlo_id`, `misto_id`, `telefon`, `email`)
 
---
 
## API endpoints (výběr)
 
- `GET /api/misto` – seznam všech míst
- `POST /api/misto` – přidání místa
- `PUT /api/misto/:cislo_mista` – změna stavu místa
- `DELETE /api/misto/:cislo_mista` – smazání místa
- `GET /api/rezervace` – seznam rezervací
- `POST /api/rezervace` – vytvoření rezervace
- `PUT /api/rezervace/:id` – úprava rezervace
- `DELETE /api/rezervace/:id` – smazání rezervace
- `POST /api/vozidlo` – přidání/nalezení vozidla podle SPZ
 
---
 
## Dokumentace
 
Podrobná dokumentace projektu je dostupná ve složce [`docs`](./docs) a lze ji spustit pomocí VitePress:
 
```sh
npm run docs:dev
```
 
Otevře se na adrese [http://localhost:5173](http://localhost:5173) (výchozí port VitePress).
 
---
 
## Autor
 
Bořek Novák