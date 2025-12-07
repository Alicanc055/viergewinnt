# Vier Gewinnt - Projektdokumentation

## 🎮 Spiel starten

**GitHub Pages:** [https://alicanc055.github.io/viergewinnt/](https://alicanc055.github.io/viergewinnt/)

> **Wichtig:** Falls du den README siehst statt des Spiels:
> 1. Gehe zu [Repository Settings → Pages](https://github.com/alicanc055/viergewinnt/settings/pages)
> 2. Setze "Source" auf: **gh-pages** branch, **/ (root)** folder
> 3. Klicke "Save" und warte 1-2 Minuten
> 4. Dann funktioniert der Link oben

## Team
- Jean-Ali Capar

## Funktionsübersicht
Diese Webanwendung implementiert das klassische Spiel "Vier Gewinnt" (Connect 4). 
Die Hauptfunktionen umfassen:
- **Interaktives Spielfeld**: Ein 7x6 Gitter, das dynamisch im Browser gerendert wird.
- **Spielerwechsel**: Automatischer Wechsel zwischen Spieler 1 (Rot) und Spieler 2 (Gelb).
- **Gewinnprüfung**: Algorithmus zur Erkennung von 4 Steinen in einer Reihe (horizontal, vertikal, diagonal).
- **Reset-Funktion**: Möglichkeit, das Spiel jederzeit neu zu starten.
- **Statusanzeige**: Visuelles Feedback, welcher Spieler gerade am Zug ist und wer gewonnen hat.

## Implementierungsdetails
Die Anwendung wurde als statische Webseite mit HTML, CSS und Vanilla JavaScript umgesetzt.
- **Frontend**: Die Datei `public/connect4.html` enthält die Struktur und die Spiellogik.
- **Styling**: Das Design wird durch `public/connect4.css` definiert, welches responsive Elemente für verschiedene Bildschirmgrößen enthält.
- **Backend**: Ein einfacher Node.js Express Server (`index.js`) dient zum Ausliefern der statischen Dateien, ist aber für die reine Spiellogik im Client nicht zwingend erforderlich.

## Screenshots
<img width="827" height="870" alt="image" src="https://github.com/user-attachments/assets/a591deb8-26f8-4e1a-b2ba-4e63287b7867" />
