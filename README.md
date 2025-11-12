# Vier gewinnt - Server Edition

Ein vollständiges Vier-gewinnt-Spiel mit Express-Server und REST-API zum Speichern und Laden des Spielzustands.

## Features

- 🎮 Vollständig spielbares Vier-gewinnt-Spiel
- 💾 Speichern und Laden des Spielzustands über REST-API
- 🌐 Express-Server mit statischen Dateien
- 🔄 Synchronisation zwischen verschiedenen Browsern möglich
- 🎨 Modernes, responsives Design

## Installation

```bash
npm install
```

## Server starten

```bash
npm start
# oder
node index.js
```

Der Server läuft dann auf: http://localhost:3000

## Spiel spielen

1. Öffne im Browser: http://localhost:3000/connect4.html
2. Klicke auf ein Feld, um einen Spielstein zu platzieren
3. Die Spielsteine fallen automatisch nach unten
4. Rot und Blau wechseln sich automatisch ab

## Server-Features

### Buttons

- **Neues Spiel**: Setzt das Spielfeld zurück
- **Laden**: Lädt den gespeicherten Spielzustand vom Server
- **Speichern**: Speichert den aktuellen Spielzustand auf dem Server

### REST-API

Die API ist unter `/api/data/:key` verfügbar und benötigt den API-Key `c4game`.

**Spielzustand speichern:**
```javascript
PUT /api/data/c4state?api-key=c4game
Content-Type: application/json

{
  "board": [...],
  "currentPlayer": "r"
}
```

**Spielzustand laden:**
```javascript
GET /api/data/c4state?api-key=c4game
```

## Projekt-Struktur

```
viergewinnt/
├── index.js                 # Express-Server
├── package.json            # Node-Abhängigkeiten
├── public/                 # Statische Dateien
│   ├── connect4.html      # Haupt-HTML-Datei
│   ├── connect4.css       # Stylesheet
│   └── memo.js            # Memoization-Hilfsfunktion
├── connect4-game.html     # Standalone-Version (ohne Server)
└── README.md              # Diese Datei
```

## Technologien

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: RESTful API mit JSON
- **Storage**: In-Memory (im Server gespeichert)

## Cross-Origin Hinweise

Da HTML und API vom gleichen Server (localhost:3000) geladen werden, gibt es keine CORS-Probleme. 
Alle Anfragen bleiben auf derselben Origin.

## Entwicklung

Das Spiel basiert auf den Praktika:
1. HTML/CSS für das Spielfeld
2. DOM-Scripting mit JavaScript
3. Model-View-Trennung mit State
4. Event-Handling und Spiellogik
5. Server-Integration mit REST-API

## Erweiterungsmöglichkeiten

- ✅ Gewinn-Erkennung (vier in einer Reihe)
- ✅ Mehrere gespeicherte Spielstände
- ✅ Spieler-Namen
- ✅ Multiplayer über WebSockets
- ✅ Persistente Datenbank (z.B. MongoDB, SQLite)
- ✅ Animationen beim Fallen der Spielsteine

