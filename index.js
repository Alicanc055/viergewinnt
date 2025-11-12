// Express Server für Vier gewinnt mit REST-API
const express = require('express')
const app = express()
const port = 3000

// Middleware für JSON-Body-Parsing
app.use(express.json())

// Middleware für statische Dateien (HTML, CSS, JS)
app.use(express.static('public'))

// In-Memory Datenbank für REST-API
let data = {
  // Anfangszustand für Vier gewinnt
  c4state: {
    board: Array(6).fill('').map(() => Array(7).fill('')),
    currentPlayer: 'r',
    gameOver: false,
    winner: null
  }
}

// API-Key Validierung
const validApiKeys = ['test', 'c4game']

function checkApiKey(req, res, next) {
  const apiKey = req.query['api-key']
  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid or missing API key' })
  }
  next()
}

// REST-API Endpunkte

// GET - Daten abrufen
app.get('/api/data/:key', checkApiKey, (req, res) => {
  const key = req.params.key
  if (data.hasOwnProperty(key)) {
    res.json(data[key])
  } else {
    res.status(404).json({ error: 'Key not found' })
  }
})

// PUT - Daten speichern/aktualisieren
app.put('/api/data/:key', checkApiKey, (req, res) => {
  const key = req.params.key
  data[key] = req.body
  res.json({ success: true, key: key })
})

// DELETE - Daten löschen
app.delete('/api/data/:key', checkApiKey, (req, res) => {
  const key = req.params.key
  if (data.hasOwnProperty(key)) {
    delete data[key]
    res.json({ success: true, key: key })
  } else {
    res.status(404).json({ error: 'Key not found' })
  }
})

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`)
  console.log(`Vier gewinnt: http://localhost:${port}/connect4.html`)
  console.log(`API-Endpunkt: http://localhost:${port}/api/data/:key?api-key=c4game`)
})

