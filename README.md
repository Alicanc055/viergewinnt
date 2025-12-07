# 🎮 Vier gewinnt - Server Edition

Ein vollständiges Vier-gewinnt-Spiel mit Express-Server, REST-API und umfangreicher Spiellogik.

## ✨ Features

### Spielfunktionen
- 🎯 **Vollständige Spiellogik** mit automatischer Gewinnprüfung
  - Horizontal, vertikal und diagonal (beide Richtungen)
  - Unentschieden-Erkennung bei vollem Spielfeld
  - Blockierung weiterer Züge nach Spielende
- ↶ **Undo-Funktion** zum Rückgängigmachen von Zügen
- 🎨 **Modernes, responsives Design** mit fließenden Animationen
- 🔴🔵 **Automatischer Spielerwechsel** zwischen Rot und Blau

### Server & API
- 💾 **Persistente Speicherung** des Spielzustands über REST-API
- 🌐 **Express-Server** mit statischen Dateien
- 🔄 **Synchronisation** zwischen verschiedenen Browsern möglich
- 🔒 **API-Key Authentifizierung** für sichere Zugriffe
- 🚀 **GitHub Pages Ready** - Funktioniert auch ohne Server (localStorage)
- 🎯 **Dual-Mode** - Automatische Erkennung von Server/Offline-Modus

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

## 🎮 Spiel spielen

1. Öffne im Browser: **http://localhost:3000/connect4.html**
2. Klicke auf eine Spalte, um deinen Spielstein zu platzieren
3. Die Spielsteine fallen automatisch nach unten
4. Rot und Blau wechseln sich automatisch ab
5. **Gewinn**: Verbinde 4 Steine deiner Farbe (horizontal, vertikal oder diagonal)
6. **Unentschieden**: Alle Felder sind belegt, aber niemand hat gewonnen

## 🎛️ Steuerung

### Buttons

- **🆕 Neues Spiel**: Setzt das Spielfeld zurück und startet eine neue Runde
- **↶ Rückgängig**: Macht den letzten Zug rückgängig (beliebig oft möglich)
- **📥 Laden**: Lädt den gespeicherten Spielzustand vom Server
- **💾 Speichern**: Speichert den aktuellen Spielzustand auf dem Server

### Status-Anzeige

- **Während des Spiels**: Zeigt an, welcher Spieler am Zug ist
- **Nach Gewinn**: Zeigt den Gewinner an (Rot oder Blau)
- **Nach Unentschieden**: Zeigt "Unentschieden!" an

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

## 📁 Projekt-Struktur

```
viergewinnt/
├── index.js                      # Express-Server mit REST-API
├── package.json                  # Node.js Dependencies
├── public/                       # Statische Frontend-Dateien
│   ├── connect4.html            # Haupt-HTML (vollständige App)
│   ├── connect4.css             # Stylesheet (inkl. Animationen)
│   └── memo.js                  # Memoization-Hilfsfunktion
├── WINNER_INTEGRATION.md        # Dokumentation der Gewinnprüfung
├── IMPLEMENTATION.md            # Technische Implementierungsdetails
├── BUGFIX.md                    # Dokumentierte Bugfixes
└── README.md                    # Diese Datei
```

## 🛠️ Technologien

### Backend
- **Node.js** v14+ - JavaScript Runtime
- **Express.js** - Minimalistisches Web-Framework
- **REST-API** - JSON-basierte Kommunikation
- **In-Memory Storage** - Schneller Zugriff ohne Datenbank

### Frontend
- **Vanilla JavaScript** - Keine Frameworks, pure ES6+
- **HTML5** - Semantisches Markup
- **CSS3** - Moderne Styles mit Animationen
- **Fetch API** - Asynchrone Server-Kommunikation
- **DOM Manipulation** - Event-Delegation für Performance

## 🎮 Spielmechanik im Detail

### Gewinnprüfung
Die Funktion `connect4Winner(player, board)` überprüft vier Gewinnmöglichkeiten:

1. **Horizontal** (→): 4 Steine nebeneinander
2. **Vertikal** (↓): 4 Steine übereinander
3. **Diagonal rechts-unten** (↘): 4 Steine diagonal
4. **Diagonal links-unten** (↙): 4 Steine diagonal

### Schwerkraft-Logik
```javascript
// Steine fallen automatisch auf das unterste freie Feld
function findLowestFreeRow(board, col) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === '') return row
  }
  return -1 // Spalte voll
}
```

### State Management
```javascript
state = {
  board: Array(6x7),      // Spielfeld
  currentPlayer: 'r'|'b', // Aktueller Spieler
  gameOver: boolean,      // Spiel beendet?
  winner: 'r'|'b'|null,  // Gewinner
  history: Array          // Für Undo-Funktion
}
```

### Undo-Mechanismus
- **Historie**: Jeder Zug speichert eine Deep-Copy des vorherigen States
- **Rückgängig**: Pop vom History-Stack und State wiederherstellen
- **Unbegrenzt**: So viele Undo-Schritte wie Züge gemacht wurden
- **Smart Disabling**: Button nur aktiv wenn Historie vorhanden

## Entwicklung

Das Spiel basiert auf den Praktika:
1. HTML/CSS für das Spielfeld
2. DOM-Scripting mit JavaScript
3. Model-View-Trennung mit State
4. Event-Handling und Spiellogik
5. Server-Integration mit REST-API

 
