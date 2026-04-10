# Wat is een afname (session) en wat zijn de verantwoordelijkheden van de toetscoördinator?

In deze module laten we van begin tot einde zien hoe je een afname kunt opzetten. In de hoofdpagina's van deze module bespreken we de standaardprocedure van het opzetten van afnames. In de How to-sectie zijn overige handleidingen te vinden over specifieke situaties en optionele functies.

### Wat is een afname/session?

Een toets kan pas afgenomen worden wanneer deze aan een afname/session gekoppeld is. In een afname worden de datum en tijd, beveiliging en de kandidaten aan elkaar gekoppeld. Zonder afname kan een toets nooit door studenten benaderd worden.

### Wat is mijn verantwoordelijkheid als toetscoördinator?

Afnames worden opgezet door de toetscoördinator. Docenten hebben geen toegang tot de module Afnames/Sessions binnen TestVision.

Het is als toetscoördinator dus van belang het volgende te weten:

- Voor welk type toets (open boek of beveiligd) moet ik een afname opzetten?
- Welke beveiliging is er nodig?
- Is plagiaat controle gewenst?
- Hoeveel studenten zijn ingeschreven voor de toets.
- Zijn er Special Arrangements voor de toets
- Datum en tijdstip van de afname.
- Welk toetstemplate gebruik ik?

Het opzetten van een afname en het koppelen van studenten aan de juiste toets is grotendeels geautomatiseerd door de *Import Tool*. De eerste stap om een afname op te zetten is dus altijd om deze te importeren via de Import Tool. Om de Import Tool te kunnen gebruiken als toetscoördinator heb je de juiste rechten nodig. Team Digital Exams kan checken of alles goed geregeld is wanneer je tegen problemen aan zou lopen.

Over het algemeen hebben faculteiten afspraken gemaakt m.b.t. het aanleveren van de toetsen voor de toetsperiode. In de regel is de deadline 2 weken voor de toetsweek. Zorg ervoor dat je weet welke regels binnen jouw faculteit gelden.

---

# DexUM Portaal

Het DexUM portaal kan door alle toetscoördinatoren die domeinbeheerder zijn gebruikt worden.
Met het DexUM Portaal zijn de volgende toetscoördinator processen betreffende digitaal toetsen geautomatiseerd:

- ***Course Import*** — Geautomatiseerd importeren van SAP inschrijvingen naar TestVision afnamesessies.

### Productieomgeving DexUM Portal

| | |
|---|---|
| Link | https://dexumportal.library.maastrichtuniversity.nl/ |
| Haalt data op uit: | SAP CSP - Productiedata |
| Schrijft data naar: | TestVision Productie - https://maastrichtuniversity.testvision.nl/online/developers/ |

### Acceptatieomgeving DexUM Portal - Testomgeving!

Gebruik deze omgeving om (nieuwe) functionaliteit van het DexUM Portaal te testen.

| | |
|---|---|
| Link | https://dexumportal-test.library.maastrichtuniversity.nl/ |
| Haalt data op uit: | SAP CSP - Productiedata |
| Schrijft data naar: | TestVision Acceptatie - https://maastrichtuniversity-acc.testvision.nl/online/developers/ |

De acceptatieomgeving van het DexUM Portaal is zodanig ingericht dat er met een gerust hart getest kan worden.
Er wordt **NIETS** gewijzigd in TestVision Productie en er wordt **NIETS** gewijzigd in SAP Productie.

### Authenticatie - Inloggen

Inloggen op beide omgevingen van het DexUM Portaal gebeurt via UM Single-Sign-On met Multi Factor Authenticatie.
Om in te mogen loggen in TestVision moet je bij DexUM bekend zijn als toetscoordinator en geregistreerd zijn op onze DEXUM_CO-L lijst.

Om het DexUM Portaal te openen is het van belang om op kantoor (UM netwerk) of via VPN de tool te benaderen.

### Authorisatie - Wie mag wat?

Het DexUM Portaal zal alleen wijzigingen doorvoeren in TestVision binnen domeinen waar JIJ als gebruiker/domeinbeheerder aanwezig bent.
Na het inloggen in het DexUM Portaal wordt een overzicht van TestVision domeinen getoond waartoe jij rechten hebt in TestVision.

Neem contact met dexum-ub@maastrichtuniversity.nl op als de genoemde faculteiten niet kloppen (of als je niet kunt inloggen).

---

# Course Import - Afnamesessie importeren vanuit SAP in TestVision

Met behulp van de "Course Import" module van het DexUM Portaal kunnen er geautomatiseerd TestVision afnames/sessions worden aangemaakt. Tegelijkertijd worden ook studentaccounts + gegevens geïmporteerd in TestVision en worden deze studenten gekoppeld aan de aangemaakte afnames.

### Wat wordt er nu eigenlijk door deze module gedaan tijdens een import?

Op basis van course code(s), het academisch jaar en de periode code haalt deze module data van ingeschreven studenten op uit SAP. Met deze gegevens voert de module in het bijhorende TestVision-domein automatisch ...

- .. een nieuw account aan voor studenten die nog niet in TestVision staan
- .. een gegevensupdate van studenten die wél al in TestVision staan - inclusief de extra tijd voorziening
- .. een map in de module afnames aan - als deze nog niet bestaat - met de naam **/ACADEMISCH JAAR/PERIODE/**
- .. een reguliere afnamesessie aan met de naam: ***[COURSECODE]\_[YEAR]\_[PERIOD]***
- .. een koppeling van studenten zonder extra tijd aan de reguliere sessie
- .. een SPAR-afnamesessie aan met de naam: ***[COURSECODE]\_[YEAR]\_[PERIOD]\_SA*** - inclusief extra tijd van 30 minuten
- .. een koppeling van studenten mét extra tijd aan de SPAR sessie
- .. bij deze keuze van een "Custom slot [CIJFER]" wordt de naam: ***[COURSECODE]\_[YEAR]\_CS[CIJFER]\_[PERIOD]***

**SAP is leidend voor alles dat geïmporteerd wordt.**
Wanneer in SAP een toets aan een specifiek domein gekoppeld is dat niet behoort tot de gebruiker van het DexUM Portaal, kan het zijn dat de gebruiker niet voldoende rechten heeft om te importeren in TestVision. De oplossing is om via Team Digital Exams rechten aan te vragen voor de faculteit die genoemd wordt in SAP - of een collega van de betreffende faculteit te benaderen.

### Goed om te weten

- Als een sessie eenmaal geïmporteerd is, blijft deze TestVision sessie - ongeachte welke bewerkingen of verplaatsingen deze sessie in TestVision heeft ondergaan - gekoppeld aan de betreffende SAP code. Wanneer een sessie opnieuw geïmporteerd wordt door het DexUM Portaal wordt de bestaande sessie dus altijd overschreven of aangepast. De enige manier om te "ontkoppelen" is door de sessie te verwijderen - ook uit de prullenbak.
- Het is mogelijk om tussentijdse examens (Mock-exams, Midterms, etc.) te importeren naar een "**Custom Slot**". Voor het reguliere examen is het standaard examen type "Final Exam" gereserveerd.
- In de "Course Import" module blijven de import-acties behouden totdat ze handmatig verwijderd worden.
- In de "Course Import" module zie je ook de import-acties die collega-beheerders van dezelfde domeinen als jou hebben gedaan. Je kunt dus samenwerken in deze module.

---

# Controleren afname/session na import

Wanneer je een afname aangemaakt hebt via DexUM Portal dien je deze naderhand te checken in TestVision.

De tool maakt zelf een mappenstructuur aan. Het is belangrijk om je aan deze structuur te houden. Vooral wanneer er afnames op een later tijdstip geüpdatet moeten worden.

- [Academic YEAR] b.v. [2021-2022]
- [Academic Period] b.v. [200]

De geïmporteerde afname zul je in de map van de [Academic Period] vinden.
Wanneer je al een eerdere import gedaan hebt zullen de kandidaten binnen deze afname ook bijgewerkt worden.
Het is daarom van belang om binnen deze mappen **NIET** nog eigen mappen aan te maken. Afnames die in een andere map staan zullen **NIET** bijgewerkt worden.

### Controle

De belangrijkste controle na de import is kijken of de afname geïmporteerd is met het juiste aantal studenten. DexUM Portal maakt altijd twee afnames aan: een reguliere en een SPAR afname.
De afnames hebben de volgende 'naming convention': [CourseCode]\_[AcademicYear]\_[AcademicPeriod]\_[SA] waarbij SA voor de SPAR afname staat.
Er zullen dus per course altijd twee afnames geïmporteerd worden.

1. De folder is van het academisch jaar 2023-2024.
2. Er zijn twee afnames geïmporteerd, regulier en de SPAR afname. Voor een SA afname zijn de extra 30 minuten tijd automatisch ingesteld.
3. Via de "i" is het mogelijk om snel de aantallen van toegewezen studenten aan de sessie te controleren.

Wanneer de sessies er staan, kan de afname verder ingericht worden.

---

# Inrichten afname na import

Na een succesvolle import is het van belang om de afname verder in te richten zodat deze klaar staat voor de toets. Klik hiervoor op het potloodje achter de afname om het bewerkingsscherm van de afname te openen.

De afname wordt in de regel de dag vóór het examen aangezet. De toggle/schakelaartje wordt dan groen.

## Voeg de toets toe en controleer de overige instellingen

1) Bij een import is de toets nog niet toegevoegd aan de afname; deze voeg je toe door op het (+) Toets/Test icoon te klikken.

2) De afname heeft verschillende tabs die ingevuld dienen te worden om de afname klaar te maken voor de toets. Hieronder worden de eerste twee tabs uitgelegd. De tabs Inzage/Review en Beoordelen/Grade kunnen ook na de toetsafname ingesteld worden.

3) De studenten zijn bij een import automatisch toegevoegd aan de juiste afname: regulier of SPAR.

Team Digital Exams checkt afnames tijdens de reguliere toetsweken altijd de dag vóór het examen. Het is dus van belang de afname voor die tijd ingericht te hebben. **Buiten de toetsweken** checken we de afnames **op aanvraag.** Hiervoor kun je een mail sturen naar dexum-ub@maastrichtuniversity.nl

### Tab Algemeen/General

Na het toevoegen van de toets via (+) Toets/Test is het belangrijk om de display naam in te vullen.

1) Display name bevat bij voorkeur zowel module code als titel van de module; daarnaast wordt bij een SPAR afname ook het aantal extra minuten toegevoegd aan de display naam. Op deze wijze zien SPAR studenten snel of ze de juiste toets voor zich hebben.

2) De skin is de stijl waarin het examen getoond wordt. In principe is de [MU standaard] al geselecteerd.

3) Het aantal extra minuten is voor een spar afname automatisch ingevuld met 30 minuten. Indien nodig kan dit aangepast worden. Deze extra tijd wordt alleen gegeven aan studenten die het *Extra tijd*-vinkje actief hebben.

4) Vul vervolgens de datum en tijd in, als dit niet al bij de import ingevuld was. Hierbij voegen we ALTIJD 15 minuten extra aan de sessie toe om in het geval van problemen iets uitlooptijd te hebben.

De afnametijd is de tijd waarin een toets benaderd kan worden. Wanneer een afname tijd 2 uur en 15 minuten is, heeft een student dus binnen die 2 uur en 15 minuten tijd om de toets van 2 uur te maken. Een student kan nooit langer dan de toetstijd aan een toets werken, maar wanneer er problemen zijn (bijvoorbeeld een Chromebook moet vervangen worden) dan kan de 2 uur toch binnen de 2 uur en 15 min afgemaakt worden.

### Selecteer het juiste Toetstemplate

Het toetstemplate bepaalt welke informatie een student tijdens en na de toets kan zien. Bijvoorbeeld welke informatie op de resultaatpagina en bij een inzage - als default - getoond wordt. De resultaatpagina is direct zichtbaar na de toets. Om onrust in de toetshal te voorkomen raden we aan om bij summatieve toetsen geen informatie op de resultaatpagina te laten zien.

Om te bekijken wat er in het geselecteerde toets template staat, klik op de 'i'.

**Alles in het groene kader is zichtbaar tijdens de toets.**
Op een paar knoppen ter navigatie na, wordt er verder vrijwel niets anders aangevinkt.

**Alles in het gele kader is zichtbaar ná de toets.**
Omdat de resultaatpagina vaak getoond wordt én altijd terug te bekijken is via "resultaten bekijken" in TestVision, zetten we qua resultaten niets aan.

In de praktijk zijn er drie momenten waarop studenten het resultaat van een gemaakte toets kunnen bekijken:

1. *Direct na het afsluiten van de toets* — De aangevinkte opties in de **tweede gele kolom** worden hierbij in acht genomen.
2. *Op een later moment nadat de toets is afgesloten via de knop "Resultaten bekijken"* — De aangevinkte opties in de **derde gele kolom** worden hierbij in acht genomen.
3. *Tijdens een geplande review* — De aangevinkte opties die tijdens het plannen van de inzageperiode worden aangevinkt, worden hierbij in acht genomen. De aangevinkte opties van kolom 2 en 3 worden tijdens een geplande review genegeerd.

De aangevinkte opties in de **eerste gele kolom** zijn tijdens **al deze momenten** zichtbaar!

Kortom: **Zet zo weinig mogelijk aan in een toetstemplate.**
Het instellen van reviews hoeft nog niet te gebeuren tijdens het opzetten van toetstemplates of het opzetten van een afname. Dit kan ook na de afname(tijd) gedaan worden.

### Tab Beveiliging/Control

In de tab Beveiliging/Control voeg je de beveiligingsopties voor de afname toe. Er kan gekozen worden uit beveiliging door de Safe Exam Browser of de IP check. Proctoring wordt NIET gebruikt op de universiteit.

1) Als default staat voor alle faculteiten *'Resultaatverwerking uitstellen'/'Postpone results processing'* aan met een vertraging van 30 minuten. Dit betekent dat studenten binnen 30 minuten weer opnieuw in de afname kunnen worden gezet als ze per ongeluk op *Klaar/Ready* geklikt hebben waardoor deze onbedoeld is afgerond. LET OP: het terugplaatsen van studenten kan alleen binnen de Afnameperiode/Availability period die ingesteld is.

2) De default beveiliging voor een digitale toets is de IP check session. Alle examens op chromebooks worden op deze wijze beveiligd. Vink hiervoor "IP check session" aan en selecteer de locatie "UMExam Wi-Fi".

Een voorwaarde voor de IP check is de aanwezigheid van het Wi-Fi netwerk "UMExam Wi-Fi" in de ruimte; zorg ervoor dat je examens dus altijd afneemt in een ruimte waar dit Wi-Fi netwerk aan staat. Indien je dit niet weet of twijfelt neem contact op met Team Digital Exams.

De Safe Exam Browser is een andere beveiligingsoptie die eigenlijk alleen bij de computerlandschappen (UNS50/UNS40 en evt eigen computers) afgenomen wordt.

Bevat een toets video? Het is niet mogelijk om deze af te spelen op de Safe Exam browser. Toetsen die video bevatten, moeten ook voor SPAR-studenten op Chromebooks worden afgenomen.

### Tab Inzage/Review

De review tab hoeft niet voor de afname ingevuld te zijn; dit kan ook na de afname van de toets.

### Tab Beoordelen/Grade

De tab Beoordelen/Grade staat alleen open wanneer er open vragen in een toets zitten. Mocht er plagiaatcontrole nodig zijn zet deze dan op vóór de toetsafname. Plagiaatcontrole moet opgezet zijn vóór de toetsafname. Deze is namelijk niet achteraf in te stellen.

---

# Wat doe ik met SPARs in de afname?

Bij een digitale toets zijn de volgende **Special Arrangements** (SPAR) in te stellen voor studenten:

- SPAR - Extra Tijd
- SPAR - Voorleessoftware
- SPAR - Spellingscontrole
- SPAR - Papieren Bijlage

In de afname instellingen is zichtbaar welke studenten welke special arrangements hebben in de betreffende sessie.

In de vier kolommen worden de volgende SPAR-voorzieningen getoond:

- *Extra Tijd* is toegekend aan de student
- *Voorleessoftware* is geactiveerd voor de student
- *Spellingscontrole* op individueel niveau staat aan. *(Let op: als de spellingscontrole op toetsniveau aan staat, staat er automatisch een vinkje achter elke student onder spellingscontrole!)*
- *Papieren Bijlage* is geactiveerd voor de student

Overige SPAR-voorzieningen, zoals een aparte ruimte of eigen muis, worden *niet* door digitaal toetsen ondersteund. Hiervoor kan een aparte toetsafname worden geregeld. Zorg dat de sessienaam duidelijk aangeeft dat het om een uitzondering gaat. De logistiek valt buiten Team Digital Exams; *neem contact op met collega-toetscoördinatoren voor ondersteuning.*

---

# SPAR - Extra Tijd

Indien een student extra tijd toegekend heeft gekregen door de examencommissie, dan zal dit in SAP geregistreerd staan.
Als het DexUM Portaal een sessie importeert, wordt bij studenten die een **geldige tijd-gerelateerde SPAR voorziening** hebben, het extra tijd vinkje aangevinkt.
Deze studenten worden automatisch in de sessie met de toevoeging **\_SA** geplaatst waaraan automatisch **30 minuten extra tijd** is toegekend.

Studenten die géén recht op extra tijd hebben - maar bijvoorbeeld een andere niet-digitale SPAR toewijzing zoals een kleine ruimte - *kunnen* ook in de \_SA sessie geplaatst worden. Deze studenten zullen dan de reguliere toetstijd hebben en niet de ingestelde extra minuten.

Het is na de import mogelijk om studenten die een afwijkende extra tijden hebben (bijvoorbeeld 45 of 60 minuten) handmatig naar een andere sessie te kopiëren. Wees er bewust van dat bij een volgende import de studenten weer teruggeplaatst worden in de reguliere of de SPAR sessie als er handmatig aanpassingen gedaan zijn in TestVision.

**Let op:** De startdatum van de SPAR-voorziening dient vóór de start van het betreffende blok te liggen om automatisch geactiveerd te worden via de import.

**Let op:** Mocht de voorziening ingetrokken worden, de start- of einddatum van de voorziening niet correct zijn of de course foutief/afwijkend in SAP staan, dan zal de ***extra tijd*** bij de kandidaat ***uitgevinkt*** worden door de import van het DexUM Portaal.

---

# SPAR - Voorleessoftware tijdens toetsen

Vanaf Periode 4 ('24) hebben we ook voorleessoftware die ingezet wordt voor studenten die daar toestemming van de examencommissie (EC) voor hebben.

**Toekennen van het recht op gebruik van voorleessoftware tijdens toetsen**

- Een student vraagt via het SSC (Disability) bij de examencommissie toestemming aan om voorleessoftware te mogen gebruiken tijdens digitale toetsen. Toetscoördinatoren van de betreffende faculteit zijn als het goed is betrokken bij dit aanvraagproces.
- In het geval dat er toestemming door de examencommissie wordt gegeven, zal in SAP de voorziening **SPAR DSM14** worden toegekend aan de student.
- Studenten aan wie voorleessoftware tijdens toetsen is toegekend, kunnen verwezen worden naar https://umlib.nl/readaloud-exams om te oefenen en aan de slag te gaan met de software.

**BELANGRIJK**
**De betrokken toetscoördinator vinkt "Text-to-speech" aan bij de betreffende student en brengt Team Digitaal Toetsen hiervan op de hoogte per e-mail (dexum-ub@maastrichtuniversity.nl) met het betreffende studentnummer.
Neem geen (medische) informatie of aanvraagformulieren op in deze e-mail!**

**Opzet van de afname**

- De studenten met voorleessoftware kunnen geplaatst worden in de SPAR-sessie (\_SA) *mits de SPAR-sessie óók op de Chromebooks (UM Exam Wi-Fi) is ingesteld*.
- Is de SPAR-sessie anders afgeschermd (bijvoorbeeld op de Safe Exam Browser)? Maak dan een aparte sessie aan voor de voorleesstudent(en) met bijvoorbeeld een achtervoeging **\_RA.** Stel deze sessie dan wél in op de Chromebooks (UM Exam Wi-Fi). **Let erop dat deze studenten (waarschijnlijk) ook extra tijd krijgen en deze extra tijd is ingesteld bij de nieuwe aangemaakte sessie.**
- Studenten die voorleessoftware gebruiken, worden het liefst op enige afstand geplaatst van overige studenten.
- Studenten die voorleessoftware gebruiken krijgen een aparte Chromebook, hoofdtelefoon en muis!

**Chromebook**

Om voorleessoftware te kunnen gebruiken, dient er door de student gebruik gemaakt te worden van een Chromebook waarop het Audioprofiel actief is.
In de decentrale karren zijn er standaard een aantal Chromebooks in het audioprofiel geplaatst:

| Kar | Aantal | Faculteit | Chromebooks met audioprofiel | Hoofdtelefoons |
|---|---|---|---|---|
| 1R | 36 | FHML | 1R27 t/m 1R36 | 5 stuks |
| 1S | 36 | FPN | 1S31 t/m 1S36 | 5 stuks |
| 3N | 36 | FHML / FPN | 3N31 t/m 3N36 | 5 stuks |
| 1T | 36 | SBE / LAW / FASOS | 1T33 & 1T36 | 5 stuks |
| 1U | 36 | SBE / LAW / FASOS | 1U33 & 1U36 | 5 stuks |
| 2A | 36 | UCV | 2A35 & 2A36 | 5 stuks |
| 2B | 36 | UCV | - | |
| 3L | 36 | MURA | 3L35 & 3L36 | 5 stuks |
| 3M | 18 | MURA | - | |
| 3O | 36 | SBE / LAW / FASOS | 3O33 t/m 3O36 | 5 stuks |
| 3P | 36 | SBE / LAW / FASOS | 3P33 t/m 3P36 | 5 stuks |

Mochten er meer Chromebooks in het audioprofiel nodig zijn, stuur dan een verzoek naar team digitaal toetsen (dexum-ub@maastrichtuniversity.nl).

**Hoofdtelefoon**

Om discussie te voorkomen is besloten om standaard hoofdtelefoons beschikbaar te stellen vanuit de UM. Daarnaast voorkomen we hiermee dat studenten ongeschikte hoofdtelefoons meenemen. Bij de decentrale karren liggen als het goed is een aantal hoofdtelefoons (zie bovenstaand schema).

---

# SPAR - Spellingscontrole

Het is op verschillende manieren mogelijk om een spellingscontrole te gebruiken in een toets:

#### **Op toetsniveau:**

Hierbij zet je voor een hele toets de spellingscontrole aan. Voor alle studenten die de specifieke toets maken is de spellingscontrole dan zichtbaar.

#### **Op individueel studentniveau:**

Het kan voorkomen dat een student met speciale toestemming van de examencommissie het recht heeft om spellingscontrole te gebruiken tijdens een toets, terwijl dit voor andere studenten niet is toegestaan. Het is dan mogelijk om de spellingscontrole op toetsniveau uit te hebben staan, maar om deze alleen voor de specifieke student aan te zetten. Dit doe je door via Kandidaten/Candidates de betreffende student te vinden en deze te openen. Vink *"Spellingscontrole"/"Spell check"* aan en sla de wijziging op. De student ziet dan ***in elke toets*** de spellingscontrole, onafhankelijk van de instellingen van de toets.

---

# SPAR - Papieren Bijlage bij Digitale Toets

Sommige studenten hebben bij **elke digitale toets** recht op een papieren versie.
De papieren bijlage komt *exact* overeen met de digitale toets, *inclusief gerandomiseerde of gepersonaliseerde vragen en antwoordvolgorde*.

**BELANGRIJK**
De papieren bijlage heeft ***géén "Print & Scan" mogelijkheid***.
De papieren bijlage is ***alleen ter ondersteuning*** tijdens de digitale toets.
De antwoorden moeten ***digitaal op het apparaat worden ingevuld***.

Vink "Test on paper" / "Toets op papier" aan en sla de wijziging op. De student ziet dan bij elke toets (van ieder domein) dat er een geprinte versie van de toets beschikbaar is.

**BELANGRIJK**
Als "Test on Paper" is aangevinkt, krijgt de betreffende student bij de start van elke toets **een pop-upmelding** dat hij/zij recht heeft op een juiste papieren versie. Wees hier alert op en *zorg dat de papieren versie beschikbaar is* om onrust bij de student te voorkomen.

### **Printen van papieren bijlages**

Wanneer studenten met het aangevinkte recht "Test on Paper" aan een afnamesessie zijn gekoppeld, is dit zichtbaar in de betreffende kolom. Zolang er nog geen correcte print voor alle betreffende studenten is gemaakt, verschijnt er bovenaan de studentenlijst een melding in het **rood**.

Klik rechtsboven op "...", kies vervolgens "**Test on Paper**" en klik op "**Generate PDF**" om per student een PDF te genereren.

Na het genereren verdwijnt de rode melding en verschijnt er bij elke kandidaat een vinkje (✓) in de betreffende kolom.

**BELANGRIJK**
Zodra een toets wordt gewijzigd en (opnieuw) gepubliceerd, worden alle geprinte toetsen ongeldig en moeten er nieuwe prints (PDF's) worden gemaakt. De rode melding verschijnt dan direct opnieuw en bij de betreffende kandidaten komt er een "!" in de kolom te staan.

#### **Wat ziet een kandidaat?**

Wanneer een kandidaat met recht op een papieren bijlage een toets opent, ziet hij een pop-up met bovenin het scherm de versienummers van de toets. Deze codes dient de student te vergelijken met de codes op de papieren print.

#### **Wat als er géén of een verkeerde toets is afgedrukt?**

Als er ***geen toets*** is afgedrukt, ziet de student een pop-upmelding. Als er een ***oude versie van de toets*** is afgedrukt, ziet de student een andere pop-upmelding.

---

# Plagiaatcontrole instellen voor een toetsafname

Binnen TestVision is het mogelijk om antwoorden op open vragen te controleren op plagiaat. Hiervoor worden gegeven antwoorden ingediend bij de plagiaatcontrole van TurnItIn Originality en kan het resultaat van de controle door de beoordelaar bekeken en afgewogen worden.

Let op! Docenten dienen de wens voor het gebruik van plagiaatcontrole tijdig kenbaar te maken aan de toetscoördinator. **Plagiaatcontrole moet vóór aanvang van de sessie ingesteld zijn.**

## Instructies voor het instellen van plagiaatcontrole

1. De plagiaatcontrole kan bij een afname (module Afnames/Sessions) in het tabblad *'Beoordelen'/'Grade'* ingesteld worden. Vink "Plagiaatcontrole / Plagiarism check" aan (1). Vink hierna de optie "Turnitin/Simcheck" aan (2). Klik vervolgens op het potloodje om de juiste coördinator in te stellen (3).

2. Selecteer de gewenste coördinator in de geopende pop up door op het pijl-icoontje te klikken (1). Zodra de coördinator bij geselecteerd staat bevestig je dit door op klaar te klikken (2).

3. Na het opslaan van de afname is de plagiaatcontrole geactiveerd.

## Instructies voor het controleren van plagiaatcontrole

1. Wanneer een toets gemaakt wordt, zullen alle open vragen afzonderlijk door de plagiaatcontrole beoordeeld worden. De status van deze controle kan bekeken worden door bij het beoordelen menu de toets te selecteren, waarna een nieuw scherm opent met de toetsnaam linksboven in beeld (1). Om een overview van de plagiaatcontroles te krijgen klik je vervolgens op 'view overview' (2).

2. De plagiaatcontroles van de open vragen zijn vervolgens zichtbaar. In de kolom **"Status"** (1) staat de technische status van de controle. Door op een student en vraag te klikken (2) kunnen de details van de controle bekeken worden.

   Let op! Het kan een paar minuten tot enkele uren duren voordat de controle van een vraag op *'Voltooid'/'Completed'* staat.

3. Het detailvenster toont meer informatie over de betreffende plagiaatcontrole, inclusief een link naar het plagiaatrapport indien de plagiaatcontrole is afgerond.

---

# Opzetten van midterm/weekly quizzes d.m.v. kopie van de import

Wanneer het voor de afname van de toets duidelijk is dat er meerdere examens zijn is het mogelijk om deze van te voren al klaar te zetten d.m.v. een kopie.

### Waarom kan ik de originele afname niet opnieuw gebruiken?

Bij TestVision krijgt de eerste afname (Regulier/SA etc) die je via de Import Tool maakt een specifieke sessionID mee. Een afname wordt op basis van de ID geüpdatet door de Import Tool. Wijzigingen in kandidaatinschrijvingen zullen altijd in de originele afname worden geüpdatet. Daarom zal deze tot de eindtoets moeten blijven staan op de plek waar deze aangemaakt is.

Daarnaast houdt TestVision bij welke studenten de toets al gemaakt hebben om ervoor te zorgen dat een toets niet vaker dan het aantal toegestane pogingen kan worden benaderd.

### Hoe maak ik dan meerdere afnames?

Importeer de cursus via de Import Tool zoals gewoonlijk. Laat deze 'originele' afnames staan en selecteer de afname die je wil kopiëren voor de midterm/weekly quizzes.

Klik op *'Kopiëren'/'Copy'* via het menu onder de ...

Studenten worden automatisch meegekopieerd vanuit de originele versie. Je kunt meerdere afnames in één keer kopiëren.

De kopieën worden boven de originele afname neergezet. Maak van de kopie nu de midterm of weekly quiz. Een kopie wordt niet geüpdatet.

---

# Antwoordvellen printen voor print & scan afname

### Print en Scan examen

Binnen TestVision is het mogelijk om antwoordformulieren uit te printen om studenten de mogelijkheid te geven om te tekenen of een formule uit te werken.

Er zitten bepaalde voorwaarden aan een print en scan-examen qua instellingen. Check de documentatie van TestVision als je niet alle opties ziet die hieronder aangevinkt worden.

Stem goed af met de docent tot wanneer deze iets kan wijzigen in een toets waarbij gebruik wordt gemaakt van antwoordvellen. Wees er zeker van dat de toets niet meer gewijzigd wordt als je de antwoordbladen gaat printen! Wordt een toets toch nog gewijzigd en opnieuw gepubliceerd, dan wijzigt ook de barcode op de antwoordbladen.

### Zoek de juiste sessie

Selecteer de juiste sessie en klik via de ... op *'Afdrukken'/'Print'.*

Selecteer in de pop-up de twee opties en vul in hoeveel sheets per vraag je wil printen.

Download het .ZIP-bestand om alle vragen in een aparte map te krijgen.

Alle studenten staan per vraag in de PDF. Je krijgt dus per vraag één PDF met alle studenten.

Alleen de voorkant (de pagina's met barcode) van de antwoordvellen kan beschreven worden. De achterkant zonder barcode kan niet worden herkend door de TestVision software.

De printinstellingen moeten op 100% staan om later goed gescand te kunnen worden.

---

# Een gedeelde toets importeren en afnemen

Binnen TestVision is het mogelijk om toetsen te delen met andere organisaties, waarbij optioneel de resultaten geanonimiseerd weer teruggestuurd worden voor gezamenlijke analyses.

Om gedeelde toetsen te kunnen importeren, moet er eerst een koppeling gemaakt worden tussen de aanbiedende en ontvangende organisatie. Deze koppeling kan worden gemaakt door het Team Digital Exams.

## Een gedeelde toets importeren

1. Om de gedeelde toets op te halen, ga naar het onderdeel Toetsen/Tests.
2. Klik op [...] naast de knop *Nieuw/New*.
3. In het menu dat verschijnt, kies *Nieuwe gedeelde toets/New shared test*. Als die optie er niet tussen staat, controleer dan of de juiste rechten zijn toegekend.
4. Kies in de keuzelijst de juiste aanbiedende organisatie.
5. Klik daarna op de toets die je wilt importeren.
6. Klik op [OK]. De toets wordt geïmporteerd.

Een geïmporteerde toets kan niet meer bewerkt worden. Alleen de titel en de status zijn nog aan te passen.

## Een gedeelde toets afnemen

Het maken van een afname voor een gedeelde toets werkt precies hetzelfde als voor een normale toets. Je kunt dus je eigen toetstemplate en skins gebruiken en je eigen kandidaten eraan koppelen.

Als is toegestaan dat de resultaten (anoniem) gedeeld worden met de aanbiedende organisatie, verschijnt de mogelijkheid om per afname in te stellen of de resultaten gedeeld mogen worden. Die instelling zit bij de Afnames/Sessions in de tab *Inzage/Review*. Door *Resultaten delen/Share results* aan te zetten, worden de resultaten (geanonimiseerd) verstuurd naar de aanbiedende organisatie.

## Resultaten van een gedeelde toets delen

Het delen van resultaten is bedoeld om overkoepelende analyses uit te voeren over de toets. Op die manier kunnen slechte vragen geïdentificeerd en verbeterd worden.

Alleen de originele resultaten worden (geanonimiseerd) naar de aanbiedende organisatie gestuurd. Eventuele aanpassingen in de resultaten worden dus nooit naar de aanbiedende organisatie gestuurd.

---

# Een toets delen met andere organisaties of domeinen

Binnen TestVision is het mogelijk om toetsen te delen met andere organisaties, waarbij optioneel de resultaten geanonimiseerd weer teruggestuurd worden voor gezamenlijke analyses.

Om toetsen te kunnen delen, moet er eerst een koppeling gemaakt worden tussen de aanbiedende en ontvangende organisatie. Deze koppeling kan worden gemaakt door het Team Digital Exams.

Let op! Je deelt een toets altijd met een organisatie, waarna de toets in principe in elk domein binnen die organisatie te importeren is. Maar alleen door ontwikkelaars in een domein die rechten hebben om een toets te importeren.

## Resultaten van gedeelde toets raadplegen

1. Klik in het onderdeel *Toetsen/Tests* achter de gedeelde toets op [Σ].
2. Je ziet alle afnames voor deze toets. Aan de prefix kun je zien van welke organisatie de afname afkomstig is.
3. Selecteer de afnames die je mee wilt nemen in de analyse.
4. Klik op *Σ Analyse/Σ Analysis* (2). Je kunt op de normale manier de analyse uitvoeren.

Eventuele aanpassingen die je achteraf doet aan de resultaten hebben geen gevolgen voor de afnames van andere organisaties.

---

# Redenen om handmatig een toetsafname op te zetten

Het heeft de voorkeur om een toetsafname automatisch aan te maken door middel van een import. Maar in sommige gevallen gaat dit niet.

1. In TestVision, klik op *Afnames/Sessions* (1) en vervolgens op *Nieuw/New* (2).
2. Selecteer een toets voor de afname door op *Toets/Test* te drukken.
3. Navigeer naar de map waarin de gewenste toets staat (1), selecteer de toets door op het pijltje te klikken (2) en klik op *Klaar/Close* (3).
4. Selecteer het gewenste *Toetstemplate/Test template* (1) en *Bewaartemplate/Retention template* (2).
5. Klik op het tabje Algemeen en selecteer de juiste *Skin* met het dropdownmenu. Voor ***reguliere afnames*** is dit [MU standaard].
6. De *Maximale toetsduur/Maximum test time* (1) wordt automatisch ingevuld. Stel de *Verlengingsfactor/Extension factor* (2) juist in. Voor ***SPAR-afnames***: vul bij *Extra tijd/Extra time* (3) het aantal minuten in dat SPAR-studenten extra krijgen.
7. Zet het *Aantal pogingen/Attempts* (1) op 1. Stel de *Afnameperiode/Availability period* (2) in. Voeg aan de eindtijd van de toets altijd 15 minuten toe als uitlooptijd. Vink *Exclusief tonen/Show exclusively* (3) aan.
8. Bij ***reguliere afnames*** met examenwifi op Chromebooks - UMExam Wi-Fi: Klik op het tabblad *Beveiliging/Control* (1). Vink *IP-controle afname/IP check session* aan (2). Een pop-up verschijnt. Klik op het pijltje achter *UMExam Wi-Fi* (3) en klik op de knop *Klaar/Close* (4).
   Bij ***SPAR-afnames*** in het computerlandschap op UNS50: Klik op het tabblad *Beveiliging/Control* (1). Vink *Safe Exam Browser* aan (2). Een pop-up verschijnt. Klik op het pijltje achter VDIdefault (3) en klik op de knop *Klaar/Close* (4).
9. Klik op *Opslaan/Save* (1). Laat de toetsnaam terugkomen in de naam van de afname (2).

De afname is nu opgezet.

Wil je meerdere afnames tegelijk handmatig opzetten? Dat kan door afnames te kopiëren.

---

# Meerdere bestaande kandidaten toevoegen aan een handmatige toetsafname (CSV import)

Over het algemeen voegen we kandidaten toe via de Import Tool. In sommige gevallen is het nodig om een additionele afname met kandidaten aan te maken omdat de originele afname niet meer gekopieerd kan worden.

Wil je slechts één of enkele kandidaten toevoegen aan een bestaande afname? Kijk dan bij "Student handmatig aan een toets toevoegen".

Om bestaande kandidaten toe te voegen aan een afname gebruik je een CSV-document:

1. Zorg ervoor dat je een lijst met de student IDs van de kandidaten hebt om toe te voegen.
2. Open Excel; voeg "#aanmeldnaam" toe in het eerste veld (A1).
3. Hieronder plak je de studentnummers in de eerste kolom. Voeg een "voorloop-**i**" toe aan de studentnummers.
4. Sla het document op als een .csv format.
5. Maak een nieuwe afname aan in TestVision en importeer het CSV-document met kandidaten via de importknop.
6. Configureer de volgende items in de pop-up:
   - A. Kies *Toewijzingen en kandidaten importeren/Import assignments and candidates* zodat nieuwe kandidaten aangemaakt worden.
   - B. Kies het eerder aangemaakte CSV bestand.
   - C. Deselecteer de twee checkboxes.
   - D. Kies (indien nog niet voorgeselecteerd) de map "Top" als plek om de studenten te importeren.
7. Klik op OK.
8. Controleer of het aantal kandidaten in de afname overeenkomt met het aantal kandidaten in het CSV-bestand.

Doordat we alle kandidaten in de TOP folder zetten, is dit het enige domeinoverstijgende onderdeel in TestVision. Studenten volgen vaak onderwijs aan meerdere faculteiten. Bovendien hangt de oefentoets aan deze folder.

---

# Nieuwe kandidaten importeren via csv (uitzonderingen)

In uitzonderlijke gevallen kan het voorkomen dat er kandidaten geïmporteerd moeten worden via een importbestand.

TestVision update hun software regelmatig: check voor de zekerheid hun handleiding. Houd wel de afspraken m.b.t. naamgeving aan.

1. Download het bestand TestVision Template importeren kandidaten.xlsx.
2. Vul de verplichte onderdelen (in geel) in. Optionele kolommen (in groen) extra tijd/voorlezen vul je alleen in voor SPAR-studenten.

Volg voor het invullen de volgende afspraken:
- #aanmeldnaam = i+studentnummer e.g. i1000000.
- naam = achternaam, voornaam (format: Achternaam, Voornaam, prefix. Bijvoorbeeld: Boer, Frank de).
- emailadres = studenten e-mailadres.
- voornaam = 1e voornaam.
- tussenvoegsel = indien nodig.
- achternaam = achternaam.
- extra tijd = ja of nee.

3. Wanneer alles ingevuld is, sla de excel op als .csv.
4. Om de kandidaten te importeren moet er een afname met deze kandidaten gemaakt worden. Ga naar de sectie *Afnames/Sessions*, maak een nieuwe afname en importeer het bestand.
5. Selecteer het juiste CSV-bestand en zorg ervoor dat de kandidaten in de TOP-map geïmporteerd worden.

---

# Hoe werkt de Safe Exam Browser en wanneer gebruik ik deze?

Er zijn meerdere manieren in TestVision om een afname af te schermen:

- De IP check
- De Safe Exam Browser (SEB)

De SEB kan alleen gebruikt worden in het Computerlandschap op UNS50 en UNS40.

De SEB heeft functionele beperkingen t.o.v. toetsen op Chromebooks. Zo werkt de voorleessoftware niet, kunnen geen video's af worden gespeeld en is spellingcontrole niet mogelijk.

### Inrichten Safe Exam Browser in TestVision

Maak een afname aan zoals besproken in "Inrichten afname na import".

1. Vink het *Safe Exam Browser-*vakje aan onder *Beveiliging/Control* in de afname.
2. In de pop-up selecteer je de VDI default. Klik op *Klaar/Close*.
3. Sla de afname op.

Omdat de SEB werkt via de VDI is het belangrijk dat je afspraken maakt met het VDI-team van ICTS. Dit doe je door een mail te sturen naar servicedesk-icts@maastrichtuniversity.nl en dient uiterlijk 2 weken vóór de toetsafname doorgegeven te zijn.

### Voorbereiding op dag van de toets

1. Log in met het VDI-account van de faculteit op alle computers waarop studenten moeten toetsen.
2. Na het inloggen met het VDI-account start de computer vanzelf de SEB op. Dit kan tot ongeveer 30 seconden duren.
3. In de SEB opent de website van TestVision automatisch. Studenten kunnen hier nu zelf inloggen met hun normale studentenlogin.
4. Wanneer de studenten klaar zijn, moeten alle computers uitgelogd worden.

Wanneer er problemen zijn met inloggen, of laadtijden neem dan eerst contact op te nemen met het VDI-team op **043-3883400.**

---

# Kun je binnen een afname meerdere beveiligingsopties aanzetten?

Het korte antwoord: Nee.

Je kunt binnen een afname meerdere beveiligingsopties aanvinken maar dit betekent dan wel dat **alle** opties gecontroleerd worden. Aangezien dit niet mogelijk is met de set-up van de SEB en de UMExam Wi-Fi, zul je aparte afnames moeten maken wanneer je een afname wilt laten plaatsvinden op Chromebooks en in het computerlandschap.

---

# Kan een student een AZERTY keyboard gebruiken bij de toets op een Chromebook?

Nee. We toetsen op Chromebooks met een QWERTY toetsenbord. Er is in overleg met ICTS besloten geen mogelijkheid tot wisselen van toetsenbordinstellingen of zelf meegebrachte toetsenborden toe te staan.

Raden we aan om de nieuwe studenten tijdig te laten weten dat ze op een QWERTY toetsenbord moeten werken bij hun toets. Het staat op de website (https://umlib.nl/digitalexams) duidelijk vermeld.

Studenten voor wie de toetsenbord layout grote problemen geeft, dienen een SPAR voorziening (ATV) aan te vragen via Disability Support.

---

# Wanneer is een afname zichtbaar voor de student?

Een toetsafname is zichtbaar voor de student als aan de volgende voorwaarden wordt voldaan:

1. De student is gekoppeld aan de afname.
2. De afname staat AAN.
3. Het duurt 1 week of minder voordat de afnameperiode van de toets start.

De student kan de toets zien als ze op Take Test klikken. Er zijn instellingen die invloed hebben op de zichtbaarheid van de toets:

- **Show exclusively:** vanaf 30 minuten voor de start van de afname wordt deze optie actief. Vanaf dat moment worden alle andere beschikbare toetsafnames NIET getoond.
- **IP locatie:** de toetsafname is wel zichtbaar voor studenten vanaf 1 week vóór het begin van de afnameperiode, maar kan alleen geopend worden binnen de ingestelde afnameperiode EN als is ingelogd bij TestVision binnen de IP range voor ExamWIFI.
- **Safe Exam Browser (SEB):** ook hier is de toetsafname zichtbaar voor studenten vanaf 1 week vóór het begin van de afnameperiode, maar kan alleen geopend worden binnen de ingestelde afnameperiode EN als is ingelogd bij TestVision via de SEB.

---

# Wat zijn de afspraken m.b.t. het aanmaken van kandidaten?

De kandidaten (studenten) zijn het enige domeinoverstijgende onderdeel in TestVision.
**Dat wil zeggen dat de kandidaten in ALLE domeinen zichtbaar zijn.**

Om hiervoor te zorgen, willen we alle domeinbeheerders vragen om de Import Tool te gebruiken om kandidaten te importeren.

Verder zijn de volgende zaken van belang:

- ALLE studenten dienen in de "Top" map (root folder) te staan. Er wordt niet gewerkt met subfolders.
- Als weergavenaam (display name) gebruiken we het volgende format: **[Achternaam], [Voornaam] [tussenvoegsel(s)]** — *bijvoorbeeld: Boer, Frank de.*
- Van alle studenten wordt ook het UM e-mailadres meegeïmporteerd. Dit is nodig voor toetsen waarin een upload wordt gebruikt.

---

# Wat is het verschil tussen een toets uitzetten en afsluiten?

In het scherm met de *Afnames/Sessions* zie je rechts een overzicht van afnames in de geselecteerde map.

Achter de afnamenaam kun je een aantal statussen van de afname zien:

- **'Aan' of 'Uit'** — Een afname die 'uit' staat, kan niet worden afgenomen en kan (mogelijk) aangezet worden om (opnieuw) afgenomen te worden.
- **Afgesloten** — Een afgesloten afname kan ook niet worden afgenomen. Een afname dient afgesloten te zijn als resultaten op toetsniveau aangepast moeten worden. Door een afname af te sluiten wordt ook de uitgestelde resultaatverwerking direct beëindigd. Een afgesloten afname kan na een of meer aanpassingen niet meer worden aangezet.
- **Gearchiveerd** — Een afgesloten afname kan via de actieknop rechtsboven gearchiveerd worden. Het resultaat van een gearchiveerde afname is niet (meer) zichtbaar voor de kandidaat.

---

# Rolverdeling tijdens examens

Tijdens de examens is de toetscoördinator het eerste aanspreekpunt bij problemen. Je bent het aanspreekpunt voor (hoofd)surveillanten/ ICTS en Team Digital Exams (*DexUM*). Als toetscoördinator ben je in de regel aanwezig op de toetslocatie. Wanneer er besluiten genomen moeten worden ben je als toetscoördinator doorslaggevend. Team DexUM zal advies uitbrengen, maar het is aan de faculteiten dit over te nemen of niet.

### Tijdens examenweken

Tijdens de examenweken staat het Team DexUM klaar voor alle faculteiten. We controleren alle afnames de dag voor de toets.

Tijdens toetsweken is het noodnummer **088 388 6390** bemenst tijdens alle afnames. Bij vragen zijn we ook bereikbaar via de Toetsweken Teams Chats.

VDI problemen kunnen direct met ICTS opgenomen worden: **043 - 388 34 00** ook bemenst tijdens toetsweken.

Zijn er problemen met de examenwifi? Bel dan het noodnummer van Team Netwerken: **043 388 5500**

### Buiten examenweken op aanvraag

Buiten de examenweken is ondersteuning van Team DexUM aan te vragen door twee weken voor het plaatsvinden van de toetsen een mail te sturen naar dexum-ub@maastrichtuniversity.nl.

**Let op!** Indien er gebruik gemaakt wordt van de SEB buiten de examenweken dient hiervoor ook apart support aangevraagd te worden bij **DWP**.

---

# Check, dubbel check: laatste controles 1 dag vóór de toets

Als je de afname hebt ingesteld en de juiste datum en tijd hebt ingevuld, kun je de afname **aanzetten** in de sectie **Afnames / Sessions.** Dit doe je door de **schuifknop (toggle)** naar *Aan / On* te verplaatsen.

**Let op:** Zorg dat de toetsen **uiterlijk om 9:00 uur op de dag vóór de afname klaarstaan en zijn ingeschakeld.**

### Welke toetsafnames controleren wij?

Een dag voordat de toets wordt afgenomen, controleert Team Digital Exams of alles volgens afspraak is ingericht. We controleren de afnames die **op het toetsoverzicht van het SSC** staan, en toetsen buiten de toetsweken die speciaal bij ons zijn aangevraagd.

### Lijst van controlepunten

- De **coursecode** uit de **sessienaam** moet zowel in de **toetsnaam** als in de **displaynaam** voorkomen.
- Als het balkje met de toetsnaam **oranje** is, betekent dit dat de toets tussentijds door de docent is aangepast, maar **nog niet is bijgewerkt** in de afname.

### Tab: Algemeen / General

- Staat de *Skin* op UM standaard?
- Is de *Maximale toetsduur/Maximum test time* goed ingevuld?
- Staat de *Verlengingsfactor/Extension factor* ingesteld (standaard op 1)?
- Is de Extra tijd / Extra time correct ingevuld? Standaard wordt er **30 minuten extra** gegeven.
- Is *Aantal pogingen/Attempts* aangevinkt en ingesteld op 1?
- Staat bij de *Afnameperiode/Availability period* de juiste datum en tijd? *De starttijd moet overeenkomen met wat in het overzicht van SSC staat.*
- Is in de eindtijd van de *Afnameperiode/Availability period* rekening gehouden met de extra tijd?
- Is er aan de eindtijd van de *Afnameperiode/Availability period* 15 minuten extra toegevoegd als uitlooptijd?
- Is het vakje *Exclusief tonen/Show exclusive* aangevinkt?
- Bevat de *toets template* alleen maar "veilige" opties?

### Tab: Beveiliging/Control

- Staat de *Postpone Results Processing* aangevinkt?
- Staat de *Safe Exam Browser (SEB)* aangevinkt met de juiste configuratie voor (SPAR-)afnames op UNS50?
- Staat de *IP Check Session* aangevinkt met de "**UMExam Wi-Fi**" als locatie voor afnames in het MECC, Tapijn, UNS40, USC en bij UCV?

### Kandidatenlijst

- Staan in de reguliere sessie alleen maar kandidaten zónder Extra Tijd?
- Staan in de \_SA sessie alleen maar kandidaten met Extra Tijd?
- We controleren *niet* of het aantal studenten klopt (behalve als er géén studenten zijn toegewezen).

---

# Monitoren in het dashboard tijdens een toetsafname

TestVision heeft een speciaal afnamedashboard waarop je alle sessies die bezig zijn kunt monitoren. Je opent het dashboard door in het hoofdmenu het *Afnamedashboard/Session Dashboard* aan te klikken.

Dit opent een nieuw tabblad waar je een afnameoverzicht en een tab met detailinformatie over de afname in kunt openen. In het overzicht kun je op basis van je zoekopdracht (1) een overzicht van alle afnames zien. Je ziet de status van de afname en de datum en tijd waarop deze start en eindigt (2). Als er nog iets niet in orde is met de afname zie je in de kolom Problems een symbool !!! verschijnen (3).

In de tab *Afnameset/Session set* kun je maximaal 25 afnames toevoegen.

Via het dashboard kun je ook snel acteren als er iets mis gaat:

- Een broadcast bericht versturen
- Extra tijd instellen
- Een student terugzetten in een afname

---

# Een issue in TestVision melden tijdens het monitoren

Tijdens het monitoren van een toets kan het voorkomen dat er een issue optreedt in TestVision.

**Indien er geen wifi- of internetverbinding meer is, geef dit dan zo snel mogelijk door bij Team Netwerken! 043-3885500**

Volg de workflow in het handboek wanneer een issue wordt opgemerkt, door jezelf of door berichtgeving van een surveillant of student.

Na het melden van het issue bij Team Digital Exams kan de TestVision statuspagina (https://status.testvision.nl/) in de gaten gehouden worden voor verdere updates.

---

# Student handmatig aan een toets toevoegen (of verwijderen)

Soms ontbreekt een student in een sessie (of zit deze in een verkeerde sessie, bijvoorbeeld de SPAR sessie).

### Student in de juiste sessie plaatsen

Open de betreffende sessie en klik op + Candidates (1).

Zorg dat de Top folder geselecteerd is (1) en zoek de student in de lijst. Gebruik eventueel het zoekvenster (2) om op volledig studentnummer (vergeet de i niet!) of (een deel van) de achternaam te zoeken. Voeg de student met het pijltje (3) toe en klik op Close (4).

Vergeet de sessie niet op te slaan!

### Student uit incorrecte sessie verwijderen

Open de sessie en klik bij betreffende student op het kruisje (1). Bevestig met "OK" (2) en vergeet de sessie niet op slaan (3).

---

# Hoe download ik de historie van de afname?

1. Ga naar het afname menu en selecteer de afname waar de student aan deelgenomen heeft en klik op Results.
2. Selecteer de student waar je de historie van wil zien en klik op historie.
3. In een apart tabblad opent de sessie historie. Je kunt deze ook downloaden om het beter te doorzoeken.
4. Om de data te interpreteren kun je de uitleg van de statussen in de TestVision documentatie vinden.

---

# Hoe vervang ik een verkeerde toets in afname

Ondanks alle checks blijkt tijdens een examen dat het verkeerde examen aan de afname hangt. Afhankelijk van het tijdstip van het ontdekken zijn er twee oplossingen.

### De studenten zijn nog niet begonnen:

1. Indien mogelijk: Zorg ervoor dat de studenten nog niet beginnen door ze even verbaal toe te spreken.
2. Schakel zo snel mogelijk de afname uit in het afnamescherm.
3. Open de afname (via het potloodje) en hang de juiste toets aan de gesloten afname.
4. Zet de afname weer open.
5. Studenten kunnen nu weer beginnen aan de juiste toets.
6. Verleng eventueel de *Afnametijd/Availability period* als het langer dan de 15 minuten uitlooptijd heeft geduurd.

### Er is al een student begonnen:

1. In de sectie *Afnames/Sessions* open je de afname in kwestie met de verkeerde toets en sluit deze door op het schuifknopje te klikken.
2. Indien gewenst: Stuur studenten die gestart zijn d.m.v. een broadcast message (via het dashboard) een melding dat ze de toets moeten sluiten.
3. Kopieer de afname (denk ook aan de SA en RA afnames voor SPAR-studenten).
4. Open de gekopieerde versie.
5. Verander dan de toets naar de juiste toets.
6. Controleer of de studentaantallen hetzelfde zijn als in de originele afname.
7. Open de gekopieerde afname met de juiste toets.
8. Stuur eventueel als vervolg op het eerste broadcast bericht een tweede bericht om aan te geven dat studenten in een andere toets moeten herstarten.
9. Geef eventueel extra afnametijd als het langer dan de 15 minuten uitlooptijd heeft geduurd.

---

# Hoe verstuur ik een broadcast message tijdens een toetsafname?

Tijdens een toetsafname kan het nodig zijn dat alle studenten die de toets aan het maken zijn direct op de hoogte worden gesteld. Via het afnamedashboard is het mogelijk om alle studenten die gestart zijn tegelijk een centraal bericht te sturen, wat direct in beeld komt als pop-up in hun toets.

Een bericht/broadcast message verstuur je op de volgende manier:

1. Open het *Afnamedashboard/Session dashboard*.
2. Open de afname waar je een bericht naartoe wil sturen onder het tabje *Afnameset/Session set*.
3. Selecteer de afname waar je een bericht naartoe wil sturen. En klik op de ... om de acties voor de sessie te openen. Klik hier op *Berichten/Messages*. Een bericht wordt per afname verstuurd; let er op of er SPAR of andere afnames zijn die je ook moet informeren.
4. Vul vervolgens het bericht in dat je aan de studenten wil doorgeven. De afspraak bestaat om met een titel te beginnen zodat de studenten weten van wie het bericht komt. Klik op "send".

Een bericht blijft staan; mochten studenten op een later tijdstip dezelfde toets doen en het bericht is niet van toepassing, is het beter om hier een aparte afname van te maken.

---

# Extra tijd instellen

Door omstandigheden - denk aan technische storingen, netwerkproblemen, logistieke problemen, enzovoorts - kan het gebeuren dat studenten meer tijd moeten krijgen voor een toets.

Het is mogelijk om op zowel op *sessieniveau* als *studentniveau* extra toetstijd of afnametijd toe te kennen tijdens een afname.

- **Toetstijd** — De maximale tijd dat een student over het maken van de toets mag doen. Deze tijd (*minuten*) wordt ingesteld op toetsniveau maar kan via het dashboard verlengd met een factor.
- **Afnametijd** — Het tijdsvenster waarbinnen een toets gemaakt mag worden.

### Dashboard - Tijdswijzigingen op sessieniveau

Klik achter een sessie op de drie puntjes en vervolgens op "Change time settings".

**Extension factor / Verlengingsfactor** - *Standaardwaarde: 1.0* — De ingestelde toetstijd wordt voor *alle studenten* in deze sessie met deze factor vermenigvuldigd. Let op dat de *afnameperiode óók moet worden verlengd* als deze niet lang genoeg is voor de extra toetstijd.
*Voorbeeld: Wil je de toetstijd verlengen van 120 minuten naar 150 minuten, wijzig de verlengingsfactor naar **1.25**.*

**Extra time / Extra tijd** - Spar Studenten — Dit is de tijd die ingesteld is voor de *SPAR studenten die extra tijd krijgen*. Deze tijd wordt NIET beïnvloed door de extension factor.

**Availability period / Afnameperiode** — Wijzig het afnamevenster waarin de toets gemaakt kan worden. Dit geldt voor *alle studenten* in deze sessie.

### Dashboard - Tijdswijziging op studentniveau

Heeft niet iedere student in een sessie recht op extra tijd? Dan kan er per student extra tijd toegekend worden. Klik achter een student op de drie puntjes en vervolgens op "Set extra time".

**Extra time / Extra tijd** — Dit zijn de extra minuten die een student krijgt *bovenop de ingestelde sessie instellingen*. ***Deze extra tijd verlengt ook automatisch de afnametijd voor de student waardoor de afnametijd van de sessie NIET verlengd hoeft te worden.***

---

# Kandidaten terugplaatsen in een afname als te vroeg op Ready geklikt is

In TestVision is door Team Digital Exams de mogelijkheid ingesteld om het resultaatverwerkingsproces uit te stellen met 30 minuten. Binnen deze 30 minuten is het voor toetscoördinatoren mogelijk om afgeronde pogingen weer open te zetten.

**Let op:** De uitgestelde resultaatverwerking staat voor iedere nieuwe toetsafname in alle domeinen standaard aan. Het is dus voor formatieve toetsen of toetsen waarbij directe resultaatinzage gewenst is belangrijk om deze optie actief uit te zetten bij het opzetten van een toetsafname!

De stappen zijn:
- Instellingen van de toetsafname
- Student terugzetten tijdens de toetsafname
- Impact op logging van de toetsafname

---

# Ik kan de afname niet sluiten en krijg de errorcode: 3326

Wanneer de afnameperiode voorbij is en een student nog bezig is, is het niet mogelijk om een sessie te sluiten. De oorzaak hiervan ligt bij het afsluiten van een toets door de student. Wanneer een student niet op *Ready/Klaar* klikt maar gewoon de browser sluit blijft de student als bezig staan. Na 30 dagen sluit TestVision de poging automatisch af.

Er zijn twee methoden om deze poging te sluiten:

## Via het afnamedashboard

1. Ga naar het *Afnamedashboard/Session dashboard*, laad de afname in en klik op de ... achter de kandidaat die nog bezig is. In de pop-up klik je vervolgens op *Afname afronden/Finalise session*.
2. Er komen twee waarschuwingen; klik twee keer op "Ok".
3. Nu kun je de afname sluiten in het afnamemenu.

## Via de toetsresultaten

1. Ga naar de betreffende afname in de module "Sessions".
2. Klik bij de betreffende sessie op "Results".
3. Kies de kandidaat die nog "Busy" / "Not completed" is en druk op "Stop".

---

# Beoordeling van een toets instellen

Als toetscoördinator ondersteun je een docent ook bij het beoordelen van de toetsresultaten. In het nieuwe beoordelen (nov '24) zijn de beoordelingsinstellingen op toetsniveau ingesteld.

Als je de docenten zelf hun beoordeling in laat stellen hoef je alleen de blokcoördinator toe te voegen als beoordelingcoördinator.

Als een toets meerdere malen gemaakt wordt, in verschillende periodes, raden we aan om de toets te kopiëren voor de latere afname.

Wanneer het hele grading proces anoniem moet zijn, zul je als toetscoördinator de beoordelingscoördinator zijn.

## Beoordelingscoördinator/grading coordinator instellen

Standaard **wordt de persoon die voor de eerste keer een toets aan een afname hangt de grading coordinator**. We adviseren om ook de andere toetscoördinatoren van je faculteit toe te voegen als grading coordinator.

## Jezelf toevoegen als beoordelingscoördinator/grading coordinator

Om de beoordelingsinstellingen van een toets te kunnen inzien moet je **altijd als coördinator gekoppeld zijn aan de toets.**

---

# Antwoordbladen scannen t.b.v. nakijken Print & Scan-afname

Nadat er een toets is gemaakt waarbij gebruik is gemaakt van papieren antwoordbladen, kun je deze scannen en invoeren in TestVision.

## Uploaden van scans in TestVision

1. Ga naar de sectie *Gepubliceerde toetsen/Published tests* en selecteer de juiste afname. Klik nu op *Analyse/Analysis* rechts in het scherm.
2. Er opent nu een nieuwe pagina waar je op het checklist-icoontje moet klikken aan de rechterkant van het scherm.
3. Dit opent een nieuwe pagina waar je de gescande bestanden kunt uploaden. Klik op *Upload*.
4. Er opent een pop-up. Kies voor *Gescande antwoordformulieren of antwoordbladen/Scanned answer forms or answer sheets*.
5. De bestanden worden nu geüpload. Je komt in een overzicht met de antwoordbladen. Check even of de juiste files gekoppeld zijn en klik op *Verwerken/Processing*.

**Let op!** Wanneer je op *Verwerken/Processing* klikt wordt alles vastgezet. Je kunt bijlagen dan niet meer verwijderen.

Voor de beoordelaars zijn de gescande antwoordbladen vanaf nu zichtbaar bij de sectie *Beoordelen/Grade*.

---

# Downloaden van student antwoordbladen in een zip-bestand

Volg de volgende stappen om door studenten geüploade documenten uit TestVision te exporteren in een zip-bestand. De documenten worden per afname gedownload.

1. Ga naar het menu "Afnames"/"Sessions" en selecteer de afname waarvan je de documenten wil downloaden. Klik op "Results".
2. Klik in het resultaatscherm vervolgens op "Download" en klik op "Collect: ingeleverde bestanden downloaden (ZIP)"/"Collect submitted files (ZIP)". In het pop-upvenster vink je alle vakjes aan. Klik op "OK" om het zip-bestand te downloaden.

---

# Een docent kan de afgeronde beoordelingen niet terugvinden

Een veel voorkomende hulpvraag vanuit de docenten is het zoeken van de feedback nadat er nagekeken is. Met het nieuwe grading is dit een stuk makkelijker terug te vinden. Verwijs de docenten naar de tab "published" results in het grading menu.

Beschikbare guides:
- Guide Grading per Question: https://scribehow.com/shared/Guide_Grading_per_Question__dKRCqLywRQKbZoFxrGkHIQ
- Guide Grading per Student: https://scribehow.com/shared/Guide_Grading_per_student__LjmwpQ8PTaKGTDMif5orSA

---

# Help, mijn stellingvraag werkt niet! Hoe sluit ik een vraag uit van beoordeling?

Het kan voorkomen dat een docent bij je komt met de opmerking dat de stellingvraag van TestVision niet goed werkt. Probeer dit te voorkomen door de docenten voor het begin van de toets te verwijzen naar de TestVisiontraining voor docenten.

Het is mogelijk om een vraag uit te sluiten van het examen; kijk hiervoor naar de taakhulp van TestVision.

---

# Kan ik de open vragen beoordelingscriteria na de afname nog aanpassen?

Ja, het is mogelijk om de *beoordelingscriteria/grading criteria* na de afname nog aan te passen. Het aanpassen is alleen mogelijk voor open vragen en alleen wanneer de rol adjust grading criteria is toegevoegd aan de domeinbeheerder.

---

# Waar kan ik bepaalde afnames vinden binnen Beoordelen/Grading?

**Openstaande afnames (pending)** — Onder *Openstaand/Pending* kun je afnames/toetsen terugvinden die half zijn ingesteld, die nog (deels) beoordeeld moeten worden of die nog niet gepubliceerd zijn.

**Gearchiveerde afnames (Archive)** — Wanneer de resultaten van een toets gepubliceerd zijn wordt deze automatisch naar het archief tabblad verplaatst.

**Let op!** Indien er na publish een aanpassing in de resultaten nodig is, dan moeten de resultaten via *Afnames/Sessions → Resultaten/Results* geunpublished worden.

**Afname / toets niet zichtbaar bij Openstaand / Pending** — Een afname / toets is alleen zichtbaar bij *Openstaand/Pending* wanneer je als coördinator eraan bent gekoppeld. Indien dit niet het geval is kan de toets via de knop *Overzicht / Overview* rechtsboven in het scherm opgezocht worden.

---

# Kan een beoordelaar resultaten die al gepubliceerd zijn opnieuw beoordelen?

Ja, dat kan zeker. Hiervoor heeft een beoordelaar wel de **grader commenter** rol nodig. Daarnaast moet de docent ook tot de juiste mappen toegang hebben.

De gepubliceerde resultaten zullen weer open gezet moeten worden.

---

# Waar vind ik informatie over het bepalen en afronden van cijfers in TestVision?

#### **Cijferbepaling & Cesuur**

De cijferbepaling wordt bepaald door de "**scoring properties**" van een toets. Het is het beste om deze instellingen vast te leggen tijdens het maken van de toets, maar ze kunnen na afloop van de toets nog worden aangepast.

#### **Cijferafronding**

TestVision hanteert verschillende methoden voor het afronden van cijfers. Dit wordt in de docententraining uitgelegd.

---

# Waar moet ik op letten bij het maken van wijzigingen aan de beoordelingsopties?

Is het beoordelen al gestart en moet er wat veranderd worden in de beoordelingssettings? Let er dan goed op dat je de juiste settings wijzigt!

**Verschil tussen Grading allowed en No grading (Grading methods)** — Als de situatie erom vraagt dat er nog niet beoordeeld mag worden voor een toets, dan is het belangrijk om daarvoor de toggle bij *"Grading possible"* te gebruiken. Gebruik hiervoor **NIET** de toggle bij *"Grading methods"*. Dit zorgt er namelijk voor dat alle resultaten meteen gepublished worden en alle open vragen met 0 beoordeeld worden.

---

# Het opzetten van een inzage

Het opzetten van een inzage wordt gedaan in de sectie Afname/Sessions van een toets. Dit kan zowel vóór als na afname van de toets ingesteld worden. In principe zijn er in totaal twee inzagemomenten mogelijk binnen TestVision. Wát een student kan zien wordt bepaald door zowel het toetstemplate en de instellingen van de inzage.

Wanneer er een derde inzage ingesteld moet worden is het van belang dit vóór het instellen van de 1e inzage te weten.

1. Om een inzage op te zetten open de module *Afnames/Sessions*; klik op de tab *Inzage/Review*. Vink *Inzage plannen/Plan Review* aan om de instellingen aan te passen. Kijk of je de juiste inzage geselecteerd hebt (1) en stel de datum waarop je de inzage wil opzetten in (2). Het is ook mogelijk om de inzage extra te beveiligen, dit kan d.m.v. de Safe Exam Browser of IP check (3) maar ook met een zelf ingesteld wachtwoord.
2. Wanneer de beveiligingsopties zoals in de afbeelding hierboven niet te selecteren zijn, moeten deze eerst aangevinkt worden in de afname. Ga hiervoor naar de tab *Beveiliging/Control* en vink de beveiliging die je wil gebruiken aan.
3. Voor de IP check session is toegang tot Examen Wifi noodzakelijk. Dit is alleen mogelijk wanneer de review op een Chromebook gedaan wordt.
4. Wanneer de beveiliging ingesteld is, ga je verder met het toewijzen van kandidaten aan de review. Je kunt alle kandidaten in één keer toewijzen of studenten individueel selecteren. Bovendien kun je hier ook aangeven welke informatie je zichtbaar wil maken tijdens de geplande inzage.

Sla de afname op wanneer je alles ingevuld hebt. De inzage staat klaar om te beginnen op het ingestelde moment.

Tijdens een eerste inzage is het studentcommentaar anoniem. Na een tweede inzage is de naam wél zichtbaar bij het gegeven commentaar.

De eerste (en ook tweede) inzage kan in principe oneindig vaak verlengd en opnieuw geopend worden zolang de docent geen commentaar gegeven heeft.

---

# Opzetten van een derde inzage

TestVision ondersteunt eigenlijk slechts 2 inzagemomenten. Om een 3e inzagemoment op te zetten, kun je onderstaande workaround volgen.

### Workaround om 3 inzages op te zetten

1. Om een derde inzage op te kunnen zetten, hergebruik je eigenlijk de 1e inzage.
2. In het *Afnames/Sessions* menu stel je een eerste inzage in. De ingeschakelde afname opties zijn bij een volgend (her)gebruik weer aan te passen.
3. Wanneer de eerste inzage voorbij is, plan je een tweede 'eerste inzage' door de datum en inzage instellingen aan te passen. **LET OP!** Dit is alleen mogelijk als er geen reactie door de docent is gegeven. **LET OP!** Studenten kunnen tijdens deze tweede "eerste" inzage het eerdere commentaar op de toets wijzigen of verwijderen.
4. Na de tweede "eerste inzage" kunnen de beoordelaars een reactie geven op studentcommentaar (anoniem) van beide 1e inzages. **Hierdoor wordt de eerste inzage definitief gesloten.**
5. Nu is het ook mogelijk om de daadwerkelijke tweede inzage in te stellen in de tab Inzage/Review in een afname.
6. Na de tweede inzage kan een beoordelaar reactie geven per student. Zodra er een reactie door de beoordelaar gegeven is, wordt ook deze tweede inzage definitief gesloten.
7. Studenten kunnen commentaar op een tweede review lezen door in te loggen op TestVision. Achter het resultaat in de resultatenlijst zal er een tekstballon te zien zijn.

### Status van inzagen

| Status | Definitie | Opties |
|---|---|---|
| *No review scheduled* | Er is nog geen reviewperiode gepland. | Alles kan nog aangepast worden in de sessies. |
| *First review period has not started yet* | Eerste inzageperiode is nog niet begonnen. | Wanneer de inzage nog niet gestart is kan alles nog aangepast worden. |
| *First review has started* | Eerste inzageperiode is begonnen EN een kandidaat heeft de eerste inzage gestart. | Tijdens de inzageperiode kan niks aangepast worden. |
| *First review is over, with comment by developer* | Eerste inzage periode is voorbij EN een ontwikkelaar heeft minimaal één reactie gegeven. | Er zijn nu geen opties binnen de eerste review meer om iets opnieuw aan te zetten voor studenten. |
| *Second review has started* | Een ontwikkelaar kan geen eerste reactie meer geven. | Kan e.e.a. aangepast worden ook na afloop van de inzageperiode. |
| *Second review is over, with comment by developer* | Tweede inzage periode is voorbij EN een ontwikkelaar heeft minimaal één reactie gegeven. | Zodra een ontwikkelaar een reactie heeft gegeven zijn er geen mogelijkheden meer voor andere instellingen. |

---

# Hoe laat ik alleen "qualifications" zien in de inzage wanneer de cesuur na de toets pas bepaald wordt?

Om alleen de kwalificaties/qualifications te laten zien moet het toetstemplate erop ingericht zijn.

1. Open het *Beheer/Management* menu om naar het toetstemplate te gaan.
2. Zorg dat er een toetstemplate klaar staat waarbij op de *Resultaat/Result* tab de juiste opties zijn aan- en uitgevinkt. **Let op: de overige tekstblokken blijven leeg omdat de cesuur pas achteraf bepaald wordt.**
3. In de toets zelf moet worden vastgelegd dat pas achteraf het resultaat definitief wordt gemaakt. Open hiervoor de betreffende toets in het menu *Toetsen/ Tests*. Klik onder *Eigenschappen/Properties* op *Wijzigen/Edit* bij Scoring, toggle *Uitgebreide cijferbepaling/Extensive grade determination* aan en selecteer de optie *Achteraf definitief maken/Finalize afterwards*.

De afname kan gewoon aangemaakt worden zoals altijd. Wanneer de student klaar is krijgt deze een melding te zien waarbij aangegeven wordt dat de toets nog geen score heeft.

Wanneer de afnames gesloten zijn kan de docent via het menu *Toetsen/Tests* en vervolgens het tabblad *Scoring* de desbetreffende cesuur bepalen voor de geselecteerde sessies.

---

# Kan ik het resultaat voor specifieke studenten nog NIET publiceren?

Ja, dat is mogelijk. In sommige gevallen, bijvoorbeeld op last van de Examencommissie, mag het resultaat van een student niet worden gepubliceerd.

1. Ga naar het *Afnames/Sessions* menu en open de afname waar het betreffende resultaat van de student in zit.
2. Klik op *Resultaten/Results* en selecteer de student waarvan het resultaat niet getoond mag worden.

Aan de rechterkant kun je eenvoudig de individuele status van de resultaten op *Ongeldig/Invalid* zetten door op de status te klikken. Wanneer de resultaten wel weer getoond mogen worden, zet je het weer terug op *Geldig/Valid*.

---

# Help, ik heb een extra student voor een afgelopen inzage. Kan ik die nog open zetten?

Dat hangt er vanaf op welk moment de student zich meldt. Wanneer een eerste of tweede inzageperiode afgelopen is én de beoordelaar heeft nog geen commentaar gegeven, is het mogelijk om een student nog toe te voegen aan een "extra inzage".

### De beoordelaar heeft nog geen commentaar gegeven

1. Open het *Afname/Sessions* menu en open de afname waar de student in zit.
2. Klik op de tab *Inzage/Review* en selecteer de student die nog een inzage mag doen via de select button.

Verander nu de datum van de *Eerste inzage/First review* naar de datum en tijd waarop de student de review mag doen. Sluit de afname en sla deze op.

---

# Hoe test ik een nieuwe TestVision Release?

Nieuwe releases van TestVision worden eerst ter test aangeboden op hun acceptatie-omgeving. Team Digital Exams (*DexUM*) zal, zodra de release notes ontvangen zijn en de testperiode bekend is gemaakt, dit communiceren naar alle toetscoördinatoren.

### Hoe test ik op de acceptatie-omgeving als ontwikkelaar?

1. Wanneer het de eerste keer is dat je de acceptatie-omgeving gebruikt, is het van belang met Team DexUM te checken of jouw account al is aangemaakt.
2. Open de TestVision Ontwikkelaar acceptatie-omgeving: https://maastrichtuniversity-acc.testvision.nl/online/fe/login_tvb.htm
3. Log in met de knop "Login for UM employees" en gebruik je standaard UM account.
4. Als je bent ingelogd, check of het versienummer overeenkomt met het versienummer dat in de release notes staat.

**Start je test in het 'Acceptatie' domein.**

### Testen als student/kandidaat

Het is ook mogelijk om kandidaat features te testen via de kandidatenacceptatie-omgeving: https://maastrichtuniversity-acc.testvision.nl/online/fe/login_tva.htm > Login for external candidates

Hiervoor mogen **alléén op de testomgeving** teststudenten gebruikt/aangemaakt/bijgewerkt worden die in de kandidaten sub map "*Testaccounts Faculteiten*" staan.

### Release planning 2025

- 28 februari
- 30 mei
- 29 augustus
- 28 november

### Release planning 2026

- 27 februari
- 24 april | *afnamemodule feature beschikbaar in acceptatieomgeving*
- 28 augustus | *afnamemodule feature beschikbaar in productieomgeving*
- 30 oktober
- 22 december

---

# Wensenlijst & Feature Requests

We lopen regelmatig tegen zaken in de TestVision software aan waarbij we het gevoel hebben dat het makkelijker of beter zou kunnen.

### Wat is een wens en wat een feature request?

Wensen geven we regelmatig door aan TestVision; deze komen dan op de backlog te staan. Wanneer een wens onmisbaar is en snel opgeleverd moet worden kunnen we een feature request insturen; hier hangt wel een kostenplaatje aan.

### Huidige stand van zaken

Op dit moment kunnen feature requests worden voorgedragen tijdens de DexUM meetings. Tijdens de meeting kunnen wensen besproken worden en wordt meteen gekeken of deze wens / feature request door andere faculteiten gedeeld wordt.

---

## TESTVISION WORKFLOW - EXAM COORDINATOR PERSPECTIVE

### PHASE 1: SETUP (2-3 weeks before exam)

#### Step 1: Check/Create TestVision Folders

- **Reality check:** Most folders exist from previous years
- **BUT:** Always verify CCs can access BEFORE they try to upload at deadline
- **Action:**
  - Check if course folder exists in TestVision → Tests → [Course folder]
  - If missing: Create folder (procedure in manual Section "Create Test Vision Folders")
  - Give CC access to folder immediately

**Critical:** This prevents situations where CCs discover no access at deadline.

#### Step 2: Import Sessions from SAP via DexUM Portal

**This is THE automated step that does most of the work:**

**What DexUM Portal does automatically:**

- ✅ Creates **2 sessions** per course:
  - *[COURSECODE]\_[YEAR]\_[PERIOD]* (regular students)
  - *[COURSECODE]\_[YEAR]\_[PERIOD]\_SA* (SPAR students with +30 min)
- ✅ Pulls student list from SAP
- ✅ Assigns students to correct session (regular vs SPAR based on SAP data)
- ✅ Sets SPAR extra time to 30 minutes automatically

**Your action:**

1. Log into DexUM Portal
2. Select course codes for the period
3. Click Import
4. **Wait for import to complete** (check status indicator turns green)

### PHASE 2: CONFIGURE SESSIONS (after import)

#### Step 3: Configure Each Session (Regular + SPAR)

**For EACH session, check/set:**

**Tab: Algemeen / General**

- **Display name** includes course code + period (e.g., "BIO2006 Final Exam P5 2025")
- **Skin** = "MU standaard"
- **Max test duration** = correct (usually set by CC in test itself)
- **Extension factor** = 1 (don't touch unless emergency)
- **Extra time** = 30 min (SPAR sessions only - usually auto-set)
- **Attempts** = 1
- **Availability period:**
  - Start time = exam time from schedule
  - End time = start + exam duration + extra time (SPAR) + **15 min buffer**
- **Show exclusively** = checked

**Tab: Beveiliging / Control**

- **Postpone results processing** = checked (30 min standard)
- **Security settings:**
  - **UM Sports (chromebooks)** → IP check session → "UMExam Wi-Fi"
  - **UNS50 (SPAR students)** → Safe Exam Browser → "VDIdefault"

**Tab: Kandidaten / Candidates**

- Regular session: Only students WITHOUT extra time ⏱️ symbol
- SPAR session: Only students WITH extra time ⏱️ symbol
- Check student count matches expectations

#### Step 4: Add the Test to Session

- Click (+) Test icon in session
- Navigate to test folder
- Select correct test version
- **Verify test template** = shows minimal info (usually "MU Standard Safe Template")

### PHASE 3: PRE-EXAM CHECKS (day before exam)

#### Step 5: Turn Sessions ON

**Timing: 9:00 AM day before exam** (so DEXUM can check)

- Toggle session to "AAN / ON"
- Session turns green
- Students can now see exam in their list (but can't start yet)

#### Step 6: Final Verification Checklist

Run through DEXUM checklist (from manual "Check, dubbel check"):

- Course code in session name matches test name
- Test bar is NOT orange (if orange = test changed, need to republish)
- Skin = MU standaard
- Times correct (start, end, extra time, buffer)
- Security correct (UMExam Wi-Fi or VDIdefault)
- Student numbers match expectations

**DEXUM checks this too, but you should catch issues first**

### PHASE 4: EXAM DAY

#### Step 7: Monitor via Dashboard

- Open Session Dashboard in TestVision
- "Follow session in dashboard"
- Watch for problems (students stuck, wrong sessions, technical issues)

**Common interventions:**

- Add extra time (emergency only)
- Send broadcast message
- Replace student in session (if they're in wrong one)
- Replace wrong test (nightmare scenario - see manual)

#### Step 8: Close Session After Exam

**After all students finish:**

- Toggle session to "UIT / OFF"
- Then click "Afgesloten / Close"

**Why both?**

- OFF = can't take exam anymore
- CLOSED = ready for grading, can't reopen

### PHASE 5: POST-EXAM - GRADING SETUP

#### Step 9: Enable Grading for Course Coordinators

**Critical: CCs can't grade unless you set them as "Grading Coordinator"**

**Your action:**

1. Go to Test → Results → Grading tab
2. Check who is Grading Coordinator
3. **If it's YOU (exam coordinator)** → Add CC as grading coordinator
4. Save

#### Step 10: Verify CC Can Grade

**Test it yourself:**

1. Log in as CC (or ask them to check)
2. Go to Grading → should see the exam
3. Should be able to open student submissions

**If CC says "I can't see it":**

- Check grading coordinator role (step 9)
- Check they have developer role in domain
- Check test is in correct folder

### PHASE 6: REVIEW / INZAGE

#### Step 11: Set Up Student Review/Inzage

**When:** After grading is complete and results published

**Your action:**

1. Go to Session → Inzage/Review tab
2. Click "Inzage plannen / Plan Review"
3. Select **First review** or **Second review**
4. Set date/time window
5. Set security (usually none for review, or UMExam Wi-Fi if on chromebooks)
6. Choose what students can see:
   - Their answers ✓
   - Correct answers ✓
   - Feedback from CC ✓
   - Points per question (optional)
7. Assign all candidates
8. Save

---

## CRITICAL CHECKPOINTS (from email analysis)

### ⚠️ Things That Go Wrong Most Often:

1. **CC can't upload exam** → Folder doesn't exist or no access
   - **Prevention:** Verify access 2 weeks before deadline

2. **CC can't see student exams after grading** → Not set as grading coordinator
   - **Prevention:** Add CC as grading coordinator immediately after closing session

3. **Wrong wifi settings** → Students can't access exam
   - **Prevention:** Double-check: UM Sports = UMExam Wi-Fi, UNS50 = VDIdefault

4. **SPAR students in wrong session** → Extra time not given
   - **Prevention:** Check ⏱️ symbols - SPAR session should ONLY have students with clock symbol

5. **Session times wrong** → Students locked out or get too much time
   - **Prevention:** Start time from schedule, end time = start + duration + extra (SPAR) + 15 min

---

## QUICK REFERENCE - YOUR CHECKLIST

- □ Week -3: Verify TestVision folders exist, CCs have access
- □ Week -2: Import sessions via DexUM Portal (creates 2 sessions auto)
- □ Week -2: Configure session settings (times, wifi, candidates)
- □ Week -2: Add test to sessions
- □ Day -1: Turn sessions ON by 9am
- □ Day -1: Run final verification checklist
- □ Day 0: Monitor via dashboard during exam
- □ Day 0: Close sessions after exam ends
- □ Day +1: Set CC as grading coordinator
- □ Day +1: Verify CC can actually grade
- □ Week +2: Set up review/inzage after grading done
