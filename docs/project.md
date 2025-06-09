# Popis projektu

Aplikace pro správu parkovacích míst, rezervací a vozidel v garážovém domě.

## Funkcionality

- CRUD parkovacích míst (přidání, úprava, mazání, změna stavu)
- Rezervace míst (vytvoření, úprava, mazání)
- Evidence vozidel (automatické vytvoření při rezervaci podle SPZ)
- Detailní informace o autě na obsazeném místě
- Vizuální grid parkoviště
- Validace vstupních dat na backendu i ve formuláři

## Hlavní entity

- **misto** – parkovací místo (`cislo_mista`, `obsazeno`)
- **vozidlo** – vozidlo (`spz`, `typ_vozidla`)
- **rezervace** – rezervace místa (`vozidlo_id`, `misto_id`, `telefon`, `email`)
