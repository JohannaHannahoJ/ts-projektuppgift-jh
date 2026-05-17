# Projektuppgift - Programmering i TypeScript, DT208G

**Genomförd av: joha2102**

Länk till applikationen:

## Projektbeskrivning

Detta projekt är slutuppgiften i kursen "Programmering i TypeScript" vid Mittuniversitetet. Uppgiften går ut på att skapa en webbplats för ett fiktivt universitet, där det ska gå att lista tillgängliga kurser och skapa ett eget schema av en uppsättning kurser som läses in via en JSON-fil/API.

## Projektstruktur

Applikationen är uppdelad i core, shared och pages för att separera logik, återanvändbara komponenter och sidrelaterad funktionalitet.

## Funktionalitet
### Grundkrav
- Filtrering och sortering av kurser
- Sökfunktion för kursnamn och kurskod
- Möjlighet att skapa eget ramschema
- Responsiv design
### Extrafuktioner
- Startsida med information om lärosätet
- Lagring av ramschema i en databas
- Sortering av data i lagrat ramschema
- Inloggning och skyddade sidor
- Paginering


## Kör projektet lokalt

```bash
ng serve
```

Gå sedan till: http://localhost:4200

Sidan laddas om vid uppdateringar i koden.

## Bygg projektet

```bash
ng build
```
Detta kompilerar projektet och placerar de färdiga filerna i mappen `dist/`. 
Som standard optimeras applikationen för bästa möjliga prestanda och hastighet.
