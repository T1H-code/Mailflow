# MAILFLOW OS

**Every inbox. One intelligent system.**

MAILFLOW ist eine installierbare Web-App (PWA) für alle deine Postfächer. Sie läuft komplett im Browser, also ohne eigenen Server, und lässt sich deshalb kostenlos über **GitHub Pages** hosten.

## Die Dateien

| Datei | Wofür |
|---|---|
| `index.html` | Grundgerüst der App und das Intro |
| `style.css` | Komplettes Design (Dunkel und Hell, Animationen, Handy-Ansicht) |
| `app.js` | Die gesamte App-Logik |
| `sw.js` | Service Worker: App offline öffnen, installierbar machen |
| `manifest.json` | App-Name, Farben und Icons für die Installation |
| `icons/` | App-Icons |

Es gibt keinen Build-Schritt. Diese Dateien hochladen genügt.

---

## Tutorial: In 5 Minuten online mit GitHub Pages

### 1. Repository anlegen
1. Auf [github.com](https://github.com) einloggen und oben rechts **+ → New repository** wählen.
2. Name z. B. `mailflow`, Sichtbarkeit **Public**, dann **Create repository**.

### 2. Dateien hochladen
1. Im neuen Repository **„uploading an existing file“** anklicken (oder **Add file → Upload files**).
2. Den **Inhalt** dieses Ordners hineinziehen: `index.html`, `style.css`, `app.js`, `sw.js`, `manifest.json` und den Ordner `icons`.
   Wichtig: `index.html` muss ganz oben im Repository liegen, nicht in einem Unterordner.
3. Unten auf **Commit changes** klicken.

### 3. GitHub Pages einschalten
1. Im Repository **Settings → Pages** öffnen.
2. Unter **Build and deployment**: Source **Deploy from a branch**, Branch **main**, Ordner **/ (root)**, dann **Save**.
3. Nach ca. 1 Minute steht oben die Adresse, z. B. `https://DEIN-NAME.github.io/mailflow/`.

### 4. Öffnen und ausprobieren
- Adresse öffnen, das Intro läuft, danach startet das Tutorial.
- Unter **Konten → Demo hinzufügen** kannst du alles mit Beispieldaten testen.
- Über das Browser-Menü **„App installieren“** (Android/PC) bzw. **Teilen → „Zum Home-Bildschirm“** (iPhone) legst du MAILFLOW als App ab.

### 5. Echte Postfächer verbinden

> **Fehler „Zugriff blockiert: no registered origin / Fehler 401: invalid_client“?**
> Dann fehlt bei Google die **Autorisierte JavaScript-Quelle**. Öffne in der Google Cloud Console *Google Auth Platform → Clients → deinen Web-Client* und trage dort **genau** `https://DEIN-NAME.github.io` ein, und zwar:
> - ohne `/mailflow`
> - ohne Schrägstrich am Ende
> - mit `https`
>
> Speichern und **5–30 Minuten warten**. Prüfe außerdem:
> - Die Client-ID in MAILFLOW gehört zu genau diesem Client und endet auf `.apps.googleusercontent.com`.
> - Der Client-Typ ist *Webanwendung*.
>
> Die App zeigt dir unter **Einrichtung → Gmail** deine exakte Adresse zum Kopieren und prüft die Client-ID. Unter **Einrichtung → Fehlerhilfe** stehen alle bekannten Google- und Microsoft-Fehler mit Lösung.

Öffne in der App **Einrichtung**. Dort steht jeder Schritt mit deiner Adresse zum Kopieren:
- **Gmail**: Google Cloud Projekt anlegen, Gmail API aktivieren, OAuth-Client vom Typ *Webanwendung* erstellen. Unter **Autorisierte JavaScript-Quellen** trägst du `https://DEIN-NAME.github.io` ein und die Client-ID dann in MAILFLOW.
- **Outlook**: In Microsoft Entra eine App registrieren, Plattform **Single-Page-Anwendung** wählen und als Umleitungs-URI genau `https://DEIN-NAME.github.io/mailflow/` (mit Schrägstrich am Ende) eintragen. Berechtigungen `Mail.ReadWrite`, `Mail.Send`, `User.Read` und `offline_access` hinzufügen, dann die Client-ID in MAILFLOW eintragen.

Client-IDs sind öffentlich und kein Geheimnis. Ein Client-Secret wird **nicht** gebraucht und darf auch nie in diese Dateien.

### Updates veröffentlichen
Geänderte Dateien wieder hochladen. In `sw.js` die Zeile `const VERSION = 'mailflow-v1.0.0'` hochzählen (z. B. `v1.0.1`). Dann bekommen installierte Apps das Update und zeigen „Neue Version verfügbar“.

---

## Was MAILFLOW kann

- **Cinematic Intro**: Drei Lichtströme (deine Postfächer) fließen zu einem zusammen, danach erscheint das Logo. Einstellbar unter Darstellung (Immer, Kurz, Aus). Ein Tipp oder eine Taste überspringt es.
- **Tutorial** beim ersten Start, jederzeit erneut über Einrichtung oder Einstellungen.
- **Übersicht** mit echten Zahlen vom Anbieter, neuesten Nachrichten, Fristen und „Wartet auf Antwort“ (als Vorschläge markiert), Rechnungen, Kategorie-Verteilung und Kontostatus.
- **Posteingang** über alle Konten:
  - Ordner, Filter, Sortierung und Suche
  - Mehrfachauswahl, Archivieren und Löschen mit Rückgängig
  - Lesebereich am Desktop, Vollbild am Handy
- **Sicheres Lesen**: HTML-Mails werden bereinigt und in einer Sandbox ohne Scripts angezeigt. Externe Bilder (Tracking) sind blockiert, bis du sie erlaubst.
- **Schreiben, Antworten, Weiterleiten** mit Cc/Bcc und Anhängen bis 20 MB, Entwürfe werden lokal gespeichert.
- **11 Standard-Ordner** mit automatischer Sortierung und Begründung. Du kannst sie korrigieren und eigene Ordner und Regeln anlegen, auch zum Ausschließen von Absendern. Beim Anbieter wird dabei nichts verschoben.
- **Schnellsuche** mit ⌘K oder `/` und gespeicherten Suchen.
- **Tastenkürzel**:
  - `C` neue E-Mail
  - `J`/`K` blättern
  - `E` archivieren, `#` löschen
  - `U` ungelesen, `S` markieren, `R` antworten
- **App-Sperre** mit PIN oder Passwort (PBKDF2-Hash) plus **Face ID / Touch ID / Fingerabdruck / Windows Hello** über WebAuthn. Die Signatur jeder Entsperrung wird geprüft. Wahlweise sperrt die App bei jedem Öffnen und/oder nach Inaktivität.
- **8 Farbdesigns** (Aurora, Ozean, Smaragd, Sunset, Rosé, Gold, Neon Night, Graphit), dazu Hell, Dunkel und System.
- **Ordner voll anpassbar** und **unbegrenzt**: Name, Farbe (auch eigene), über 30 Symbole, Reihenfolge, Stichwörter und eine Beschreibung für die KI. Ordner sind ein- und ausblendbar, die Standard-Ordner wiederherstellbar.
- **Start-Animation** in den Einstellungen ein- oder ausschaltbar, komplett oder kurz.
- **Dunkel, Hell und System**, Animationen auf voll, reduziert oder aus. Die Systemeinstellung „Bewegung reduzieren“ wird respektiert.
- **Offline-Start** und Installation als App.

## KI-Assistent mit Google Gemini (optional)

MAILFLOW funktioniert komplett ohne KI. Wer möchte, verbindet einen **eigenen Gemini API-Key**:

1. [Google AI Studio → API-Schlüssel](https://aistudio.google.com/apikey) öffnen und einen Key erstellen.
2. In MAILFLOW unter **Einstellungen → KI-Assistent** einfügen und auf **Speichern & prüfen** tippen. Die App lädt die aktuell verfügbaren Modelle.

Was die KI dann kann:
- **Automatisch einsortieren:** Wenn keine Regel und kein Stichwort greift, ordnet Gemini Mails deinen Ordnern zu, auch eigenen wie „Verein“. Gesendet werden dafür nur Absender, Betreff und Vorschau.
- **Zusammenfassen:** Kernaussage, Stichpunkte, erkannte Termine und Beträge.
- **Antwort vorschlagen:** 3 Entwürfe, ein Tipp öffnet den Editor.
- **Text verbessern** im Editor: freundlicher, kürzer, förmlicher oder nur Fehler korrigieren.

Wichtig:
- Der Key wird **nicht** in den Code geschrieben, sondern nur auf dem jeweiligen Gerät gespeichert. Sonst könnte ihn auf GitHub Pages jeder kopieren.
- Mail-Inhalte gehen nur an Google, wenn du eine KI-Funktion nutzt.
- Mit der kostenlosen Gemini-Stufe darf Google Eingaben zur Produktverbesserung verwenden. Für private oder geschäftliche Mails ist ein Key mit Abrechnung sicherer.
- KI kann sich irren, also Ergebnisse prüfen.

## Wie Mails in deine Ordner kommen

In dieser Reihenfolge, das Erste, was passt, gewinnt:
1. **Deine Korrektur:** In der Mail den Ordner ändern. Danach kannst du per Toast „Immer: alles von @domain hierhin“ antippen, dann entsteht automatisch eine Regel.
2. **Regeln** (Einstellungen → Regeln), inklusive Ausschluss von Absendern oder Domains.
3. **Stichwörter** des Ordners, zum Beispiel „Training, Mitgliedsbeitrag“.
4. **Gemini**, falls eingeschaltet.
5. **Eingebaute Erkennung** für die Standard-Ordner (Rechnungen, Newsletter, Werbung …).

## Sicherheit und Datenschutz

- Kein MAILFLOW-Server: Mails gehen direkt zwischen deinem Browser und Google bzw. Microsoft hin und her.
- Passwörter deiner Postfächer werden nie abgefragt. Die Anmeldung läuft offiziell über Google Identity Services bzw. Microsoft mit PKCE.
- **Zugangstoken** liegen nur im aktuellen Tab (`sessionStorage`) und verschwinden beim Schließen. Danach tippst du auf „Neu anmelden“.
- Auf dem Gerät gespeichert werden nur Einstellungen, die Kontenliste, Kategorien, Regeln, Korrekturen und Entwürfe (`localStorage`).
- Der Service Worker speichert **nur** die App-Dateien, nie Mails oder Tokens.
- Face ID / Fingerabdruck: Der Abgleich passiert im Gerät, MAILFLOW sieht nie Gesicht oder Fingerabdruck. Es funktioniert nur über https (GitHub Pages) und auf Geräten mit entsprechendem Sensor.
- Grenzen der App-Sperre: Sie verbirgt die App, ersetzt aber nicht die Sperre deines Geräts.

## Grenzen

- **Gmail**: Ein Zugriff gilt etwa 1 Stunde, dann kurz neu anmelden. Im Google-Testmodus können nur eingetragene Testnutzer (max. 100) MAILFLOW nutzen. Für eine öffentliche App verlangt Google eine Prüfung.
- **Outlook**: Die Anmeldung gilt bis zu 24 Stunden im offenen Tab. Anhänge über 3 MB werden beim Senden noch nicht unterstützt.
- **Yahoo**: Nicht möglich in einer reinen Web-App. Yahoo erlaubt Mail-Zugriff nur über IMAP/SMTP und nach eigener Freigabe.
- Kategorie-Filter wirken auf die geladenen Nachrichten. Mit „Weitere laden“ suchst du tiefer.
- Keine Push-Benachrichtigungen bei geschlossener App (bräuchte einen Server).

Icons: [Lucide](https://lucide.dev) (ISC-Lizenz).
