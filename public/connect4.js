// ========== Konfiguration ==========
// Auto-detect: Use localhost if available, otherwise use localStorage (GitHub Pages)
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io')
const API_URL = IS_GITHUB_PAGES ? null : 'http://localhost:3000'
const DATA_KEY = 'c4state'
const API_KEY = 'c4game'

// ========== Fibonacci mit Dekorierern (aus vorherigem Praktikum) ==========

/**
 * Rekursive Fibonacci-Funktion
 */
let fibonacci = (n) => {
  if (n < 2) return n
  else return fibonacci(n-1) + fibonacci(n-2)
}

/**
 * trace - Dekorierer für Funktions-Protokollierung
 */
function trace(func, funcname) {
  return (...args) => {
    console.log(funcname + "(" + args.toString() + ")")
    return func(...args)
  }
}

// Fibonacci mit Memoizer für Performance-Tests (optional)
// fibonacci = memo(fibonacci)

// ========== Vier gewinnt Spiel ==========

/**
 * Überprüft, ob ein Spieler gewonnen hat
 * @param {string} player - Der zu prüfende Spieler ('r' oder 'b')
 * @param {Array<Array<string>>} board - Das Spielfeld als 2D-Array
 * @returns {boolean} true wenn der Spieler gewonnen hat, sonst false
 *
 * Beispiel:
 * let testBoard = [
 *   [ '_', '_', '_', '_', '_', '_', '_' ],
 *   [ '_', '_', '_', '_', '_', '_', '_' ],
 *   [ '_', '_', '_', '_', 'r', '_', '_' ],
 *   [ '_', '_', '_', 'r', 'r', 'b', 'b' ],
 *   [ '_', '_', 'r', 'b', 'r', 'r', 'b' ],
 *   [ 'b', 'b', 'b', 'r', 'r', 'b', 'b' ]
 * ]
 * connect4Winner('r', testBoard) // true (4x 'r' in Spalte 3: vertikal)
 * connect4Winner('b', testBoard) // false
 */
function connect4Winner(player, board) {
  const rows = board.length
  const cols = board[0].length

  // Hilfsfunktion: Prüft ob 4 in einer Reihe ab Position (row, col) in Richtung (dRow, dCol)
  function checkDirection(row, col, dRow, dCol) {
    let count = 0
    for (let i = 0; i < 4; i++) {
      const r = row + i * dRow
      const c = col + i * dCol

      // Prüfe ob Position im Spielfeld liegt
      if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return false
      }

      // Prüfe ob Position den gesuchten Spieler enthält
      if (board[r][c] === player) {
        count++
      } else {
        return false
      }
    }
    return count === 4
  }

  // Durchsuche alle Positionen und alle Richtungen
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Nur prüfen wenn aktuelles Feld den gesuchten Spieler enthält
      if (board[row][col] === player) {
        // Horizontal (nach rechts)
        if (checkDirection(row, col, 0, 1)) return true

        // Vertikal (nach unten)
        if (checkDirection(row, col, 1, 0)) return true

        // Diagonal nach rechts-unten
        if (checkDirection(row, col, 1, 1)) return true

        // Diagonal nach links-unten
        if (checkDirection(row, col, 1, -1)) return true
      }
    }
  }

  return false
}

/**
 * Hilfsfunktion zum Erstellen von DOM-Elementen
 */
function elt(type, attrs, ...children) {
  let node = document.createElement(type)
  Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key])
  })
  for (let child of children) {
    if (typeof child != "string")
      node.appendChild(child)
    else
      node.appendChild(document.createTextNode(child))
  }
  return node
}

// Model: Spielzustand als Array von 6 Zeilen mit je 7 Feldern
// '' = leer, 'r' = rot, 'b' = blau
let state = {
  board: Array(6).fill('').map(() => Array(7).fill('')),
  currentPlayer: 'r', // 'r' für rot, 'b' für blau
  gameOver: false,    // true wenn das Spiel beendet ist
  winner: null,       // 'r' oder 'b' wenn jemand gewonnen hat
  history: []         // Historie für Undo-Funktion
}

/**
 * Speichert den aktuellen Zustand in der Historie
 */
function saveToHistory() {
  state.history.push({
    board: state.board.map(row => [...row]), // Deep copy
    currentPlayer: state.currentPlayer,
    gameOver: state.gameOver,
    winner: state.winner
  })
  updateUndoButton()
}

/**
 * Macht den letzten Zug rückgängig
 */
function undoMove() {
  if (state.history.length === 0) {
    showMessage('Keine Züge zum Rückgängigmachen!', 'info')
    return
  }

  const previousState = state.history.pop()
  state.board = previousState.board
  state.currentPlayer = previousState.currentPlayer
  state.gameOver = previousState.gameOver
  state.winner = previousState.winner

  showBoard()
  updateUndoButton()
  showMessage('Zug rückgängig gemacht', 'info')
}

/**
 * Aktualisiert den Undo-Button (aktiviert/deaktiviert)
 */
function updateUndoButton() {
  const undoBtn = document.getElementById('undoBtn')
  if (undoBtn) {
    undoBtn.disabled = state.history.length === 0
  }
}

/**
 * Rendert das Spielfeld basierend auf dem aktuellen State
 */
function showBoard() {
  const boardElement = document.querySelector('.board')
  boardElement.innerHTML = ''

  for (let row = 0; row < state.board.length; row++) {
    for (let col = 0; col < state.board[row].length; col++) {
      const cellValue = state.board[row][col]
      let field

      const attrs = {
        'class': 'field',
        'data-row': String(row),
        'data-col': String(col)
      }

      if (cellValue === 'b') {
        const bluePiece = elt('div', { class: 'blue piece' })
        field = elt('div', attrs, bluePiece)
      } else if (cellValue === 'r') {
        const redPiece = elt('div', { class: 'red piece' })
        field = elt('div', attrs, redPiece)
      } else {
        field = elt('div', attrs)
      }

      boardElement.appendChild(field)
    }
  }

  updateCurrentPlayerDisplay()
}

/**
 * Aktualisiert die Anzeige des aktuellen Spielers
 */
function updateCurrentPlayerDisplay() {
  const statusDiv = document.querySelector('.status')

  if (state.gameOver) {
    if (state.winner) {
      const winnerName = state.winner === 'r' ? 'Rot' : 'Blau'
      const winnerColor = state.winner === 'r' ? '#f44336' : '#2196F3'
      statusDiv.innerHTML = `Gewinner: <span class="current-player" id="currentPlayer"></span> ${winnerName}!`
      // Element nach innerHTML-Änderung neu abfragen
      const playerIndicator = document.getElementById('currentPlayer')
      playerIndicator.style.backgroundColor = winnerColor
    } else {
      statusDiv.innerHTML = 'Unentschieden!'
    }
  } else {
    const currentColor = state.currentPlayer === 'r' ? '#f44336' : '#2196F3'
    statusDiv.innerHTML = 'Nächster Zug: <span class="current-player" id="currentPlayer"></span>'
    // Element nach innerHTML-Änderung neu abfragen
    const playerIndicator = document.getElementById('currentPlayer')
    playerIndicator.style.backgroundColor = currentColor
  }
}

/**
 * Handler für Klicks auf Spielfelder
 * Verwendet Event-Delegation auf dem Board-Element
 */
function handleBoardClick(event) {
  // Blockiere Klicks wenn das Spiel vorbei ist
  if (state.gameOver) {
    if (state.winner) {
      const winnerName = state.winner === 'r' ? 'Rot' : 'Blau'
      showMessage(`🎉 ${winnerName} hat gewonnen! 🎉 Klicke auf "Neues Spiel" um neu zu starten.`, 'success', true)
    } else {
      showMessage('Unentschieden! Klicke auf "Neues Spiel" um neu zu starten.', 'info', true)
    }
    return
  }

  let clickedField = event.target

  // Wenn auf die Figur geklickt wurde, gehe zum Eltern-Element (field)
  if (clickedField.classList.contains('piece')) {
    clickedField = clickedField.parentElement
  }

  // Prüfe, ob es wirklich ein Feld ist
  if (!clickedField.classList.contains('field')) {
    return
  }

  const col = parseInt(clickedField.getAttribute('data-col'))

  // Finde das unterste freie Feld in dieser Spalte
  let targetRow = -1
  for (let r = state.board.length - 1; r >= 0; r--) {
    if (state.board[r][col] === '') {
      targetRow = r
      break
    }
  }

  // Wenn die Spalte voll ist, ignoriere den Klick
  if (targetRow === -1) {
    showMessage('Spalte ist voll!', 'error')
    return
  }

  // Speichere den aktuellen Zustand in der Historie VOR dem Zug
  saveToHistory()

  // Platziere den Spielstein
  state.board[targetRow][col] = state.currentPlayer

  // Rendere das Board neu (um den Stein sofort anzuzeigen)
  showBoard()

  // Prüfe ob der aktuelle Spieler gewonnen hat
  if (connect4Winner(state.currentPlayer, state.board)) {
    state.gameOver = true
    state.winner = state.currentPlayer
    updateCurrentPlayerDisplay() // Aktualisiere Status-Anzeige
    const winner = state.currentPlayer === 'r' ? 'Rot' : 'Blau'
    showMessage(`🎉 ${winner} hat gewonnen! 🎉`, 'success', true)
    return
  }

  // Prüfe auf Unentschieden (alle Felder belegt)
  let isFull = true
  for (let row = 0; row < state.board.length; row++) {
    for (let col = 0; col < state.board[row].length; col++) {
      if (state.board[row][col] === '') {
        isFull = false
        break
      }
    }
    if (!isFull) break
  }

  if (isFull) {
    state.gameOver = true
    updateCurrentPlayerDisplay() // Aktualisiere Status-Anzeige
    showMessage('Unentschieden! Das Spielfeld ist voll.', 'info', true)
    return
  }

  // Wechsle den Spieler
  state.currentPlayer = state.currentPlayer === 'r' ? 'b' : 'r'

  // Aktualisiere die Anzeige des aktuellen Spielers
  updateCurrentPlayerDisplay()
}

/**
 * Setzt das Spiel zurück
 */
function newGame() {
  state.board = Array(6).fill('').map(() => Array(7).fill(''))
  state.currentPlayer = 'r'
  state.gameOver = false
  state.winner = null
  state.history = [] // Lösche die Historie
  showBoard()
  updateUndoButton()
  showMessage('Neues Spiel gestartet', 'success')
}

/**
 * Zeigt eine Nachricht an
 * @param {string} text - Der anzuzeigende Text
 * @param {string} type - Der Nachrichtentyp ('success', 'error', 'info')
 * @param {boolean} persistent - Wenn true, wird die Nachricht nicht automatisch ausgeblendet
 */
function showMessage(text, type = 'info', persistent = false) {
  const messageDiv = document.getElementById('message')
  messageDiv.textContent = text
  messageDiv.className = `message ${type}`
  messageDiv.style.display = 'block'

  if (!persistent) {
    setTimeout(() => {
      messageDiv.style.display = 'none'
    }, 3000)
  }
}

// ========== Server-Kommunikation ==========
// Die folgenden Funktionen kommunizieren mit dem Express-Server
// über die REST-API. Der Spielzustand wird als JSON übertragen.

/**
 * Speichert den aktuellen Spielzustand auf dem Server oder in localStorage
 * Verwendet PUT-Request mit JSON-Body (Server) oder localStorage (GitHub Pages)
 */
async function saveGameState() {
  try {
    // GitHub Pages: Use localStorage
    if (IS_GITHUB_PAGES || !API_URL) {
      localStorage.setItem(DATA_KEY, JSON.stringify(state))
      console.log('Spielstand im Browser gespeichert:', state)
      showMessage('Spielstand im Browser gespeichert! (Offline-Modus)', 'success')
      return
    }

    // Local server: Use REST API
    const url = `${API_URL}/api/data/${DATA_KEY}?api-key=${API_KEY}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Spielstand gespeichert:', result)
    showMessage('Spielstand erfolgreich gespeichert!', 'success')
  } catch (error) {
    console.error('Fehler beim Speichern:', error)
    showMessage('Fehler beim Speichern: ' + error.message, 'error')
  }
}

/**
 * Lädt den Spielzustand vom Server oder aus localStorage
 */
async function loadGameState() {
  try {
    let loadedState

    // GitHub Pages: Use localStorage
    if (IS_GITHUB_PAGES || !API_URL) {
      const savedData = localStorage.getItem(DATA_KEY)
      if (!savedData) {
        showMessage('Kein gespeicherter Spielstand gefunden!', 'error')
        return
      }
      loadedState = JSON.parse(savedData)
      console.log('Spielstand aus Browser geladen:', loadedState)
    } else {
      // Local server: Use REST API
      const url = `${API_URL}/api/data/${DATA_KEY}?api-key=${API_KEY}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      loadedState = await response.json()
      console.log('Spielstand vom Server geladen:', loadedState)
    }

    // Aktualisiere den lokalen State
    state.board = loadedState.board
    state.currentPlayer = loadedState.currentPlayer
    state.gameOver = loadedState.gameOver || false
    state.winner = loadedState.winner || null
    state.history = [] // Lösche Historie beim Laden

    // Rendere das Board neu
    showBoard()
    updateUndoButton()

    // Zeige Gewinnmeldung an, falls das geladene Spiel beendet war
    if (state.gameOver && state.winner) {
      const winner = state.winner === 'r' ? 'Rot' : 'Blau'
      const mode = IS_GITHUB_PAGES ? ' (Offline-Modus)' : ''
      showMessage(`Geladenes Spiel: ${winner} hat gewonnen!${mode}`, 'info', true)
    } else if (state.gameOver) {
      const mode = IS_GITHUB_PAGES ? ' (Offline-Modus)' : ''
      showMessage(`Geladenes Spiel: Unentschieden!${mode}`, 'info', true)
    } else {
      const mode = IS_GITHUB_PAGES ? ' (Offline-Modus)' : ''
      showMessage(`Spielstand erfolgreich geladen!${mode}`, 'success')
    }
  } catch (error) {
    console.error('Fehler beim Laden:', error)
    showMessage('Fehler beim Laden: ' + error.message, 'error')
  }
}

// ========== Event-Listener ==========

// Event-Delegation: Ein Event-Listener auf dem gesamten Board
document.querySelector('.board').addEventListener('click', handleBoardClick)

// Button-Event-Listener
document.getElementById('newGameBtn').addEventListener('click', newGame)
document.getElementById('undoBtn').addEventListener('click', undoMove)
document.getElementById('saveBtn').addEventListener('click', saveGameState)
document.getElementById('loadBtn').addEventListener('click', loadGameState)

// Initiales Rendering
showBoard()
updateUndoButton()
