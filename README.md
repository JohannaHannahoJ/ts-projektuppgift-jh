# Projektuppgift - Programmering i TypeScript, DT208G

**Genomförd av: joha2102**

Länk till applikationen: https://mittdigiversitetet.netlify.app/home

## Projektbeskrivning

Detta projekt är slutuppgiften i kursen "Programmering i TypeScript" vid Mittuniversitetet. Uppgiften går ut på att skapa en webbplats för ett fiktivt universitet, där det ska gå att lista tillgängliga kurser och skapa ett eget schema av en uppsättning kurser som läses in via en JSON-fil som innehåller kursdata.

Projektet mynnade ut i MittDigiVersitetet, en webbapplikation utvecklad med Angular och TypeScript. Användare kan söka bland kurser, skapa egna ramscheman och spara dessa i en databas. Ramschemat skyddas bakom inloggning och är kopplat till den inloggade användaren.Användarnas skapade ramscheman hanteras via ett eget REST API kopplat till en databas.

Repository för backend och API finns här: https://github.com/JohannaHannahoJ/ts-projektuppgift-jh-postgres

## Funktionalitet
### Grundkrav
- Anhular och TypeScript används. Routing och services används.
- Kurser presenteras tydligt och tillgängligt och antal kurser i aktuell sökning visas.
- Filtrering och sortering av kurser genom ämne samt kurskod, kursnamn, poäng och ämne.
- Sökfunktion på kursnamn och kurskod
- Möjlighet att skapa eget ramschema genom att lägga till och ta bort kurser, där dubletter förhindras och sammanlagd högskolepoäng presenteras.
- Responsiv design

### Extrafuktioner
- Paginering av kurslistan
- Startsida med information om lärosätet och statistik om kursutbudet
- Bildkarusell
- Registrering och inloggning
- JWT-baserad autentisering
- info om inloggad användare i footer
- Skyddade undersidor med route guards
- Automatisk utloggning vid ogiltig eller utgången token
- PostgreSQL-databas för lagring av användares ramscheman
- Egentillverkat REST API

## Projektstruktur
Applikationen är uppdelad i core, shared och pages för att separera logik, återanvändbara komponenter och sidrelaterad funktionalitet.

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