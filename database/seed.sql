-- Smazání starých dat
DELETE FROM rezervace;
DELETE FROM vozidlo;
DELETE FROM misto;

-- Naplnění tabulky misto (používáme cislo_mista a obsazeno)
INSERT INTO misto (cislo_mista, obsazeno) VALUES
(1, 'free'),
(2, 'free'),
(3, 'free'),
(4, 'occupied'),
(5, 'reserved'),
(6, 'free'),
(7, 'free'),
(8, 'reserved'),
(9, 'occupied'),
(10, 'free');

-- Naplnění tabulky vozidlo
INSERT INTO vozidlo (spz, majitel, typ_vozidla) VALUES
('1AB1234', 'Jan Novák', 'osobní'),
('2BC2345', 'Petr Svoboda', 'SUV'),
('3CD3456', 'Eva Dvořáková', 'elektro'),
('4DE4567', 'Karel Malý', 'dodávka');

-- Naplnění tabulky rezervace (příkladová data)
INSERT INTO rezervace (vozidlo_id, misto_id, telefon, email, datum_od, datum_do) VALUES
(1, 5, '777123456', 'jan.novak@email.cz', '2024-06-01', '2024-06-10'),
(2, 8, '777234567', 'petr.svoboda@email.cz', '2024-06-05', '2024-06-15'),
(3, 4, '777345678', 'eva.dvorakova@email.cz', '2024-06-03', '2024-06-12');
