/**
 * Game logic module for Connect 4
 * Contains game state management and win detection
 */

import { ROWS, COLS, WIN_LENGTH } from './config.js';

/**
 * Creates initial game state
 * @returns {Object} Initial game state
 */
export function createInitialState() {
  return {
    board: Array(ROWS).fill('').map(() => Array(COLS).fill('')),
    currentPlayer: 'r', // 'r' für rot, 'b' für blau
    gameOver: false,    // true wenn das Spiel beendet ist
    winner: null,       // 'r' oder 'b' wenn jemand gewonnen hat
    history: []         // Historie für Undo-Funktion
  };
}

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
export function connect4Winner(player, board) {
  const rows = board.length;
  const cols = board[0].length;

  // Hilfsfunktion: Prüft ob 4 in einer Reihe ab Position (row, col) in Richtung (dRow, dCol)
  function checkDirection(row, col, dRow, dCol) {
    let count = 0;
    for (let i = 0; i < WIN_LENGTH; i++) {
      const r = row + i * dRow;
      const c = col + i * dCol;

      // Prüfe ob Position im Spielfeld liegt
      if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return false;
      }

      // Prüfe ob Position den gesuchten Spieler enthält
      if (board[r][c] === player) {
        count++;
      } else {
        return false;
      }
    }
    return count === WIN_LENGTH;
  }

  // Durchsuche alle Positionen und alle Richtungen
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Nur prüfen wenn aktuelles Feld den gesuchten Spieler enthält
      if (board[row][col] === player) {
        // Horizontal (nach rechts)
        if (checkDirection(row, col, 0, 1)) return true;

        // Vertikal (nach unten)
        if (checkDirection(row, col, 1, 0)) return true;

        // Diagonal nach rechts-unten
        if (checkDirection(row, col, 1, 1)) return true;

        // Diagonal nach links-unten
        if (checkDirection(row, col, 1, -1)) return true;
      }
    }
  }

  return false;
}

/**
 * Checks if the board is full (draw condition)
 * @param {Array<Array<string>>} board - The game board
 * @returns {boolean} true if board is full
 */
function isBoardFull(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}

/**
 * Finds the lowest empty row in a column
 * @param {Array<Array<string>>} board - The game board
 * @param {number} col - The column to check
 * @returns {number} The row index, or -1 if column is full
 */
function findLowestEmptyRow(board, col) {
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r][col] === '') {
      return r;
    }
  }
  return -1;
}

/**
 * Speichert den aktuellen Zustand in der Historie
 * @param {Object} state - The game state
 */
function saveToHistory(state) {
  state.history.push({
    board: state.board.map(row => [...row]), // Deep copy
    currentPlayer: state.currentPlayer,
    gameOver: state.gameOver,
    winner: state.winner
  });
}

/**
 * Restores previous state from history
 * @param {Object} state - The game state
 * @returns {boolean} true if undo was successful
 */
export function undoFromHistory(state) {
  if (state.history.length === 0) {
    return false;
  }

  const previousState = state.history.pop();
  state.board = previousState.board;
  state.currentPlayer = previousState.currentPlayer;
  state.gameOver = previousState.gameOver;
  state.winner = previousState.winner;

  return true;
}

/**
 * Makes a move on the board
 * @param {Object} state - The game state
 * @param {number} col - The column to place the piece
 * @returns {Object} Object with success status and message
 */
export function makeMove(state, col) {
  // Find the lowest empty row
  const targetRow = findLowestEmptyRow(state.board, col);

  if (targetRow === -1) {
    return { success: false, message: 'Spalte ist voll!' };
  }

  // Save to history before making the move
  saveToHistory(state);

  // Place the piece
  state.board[targetRow][col] = state.currentPlayer;

  // Check for winner
  if (connect4Winner(state.currentPlayer, state.board)) {
    state.gameOver = true;
    state.winner = state.currentPlayer;
    return { success: true, winner: state.currentPlayer };
  }

  // Check for draw
  if (isBoardFull(state.board)) {
    state.gameOver = true;
    return { success: true, draw: true };
  }

  // Switch player
  state.currentPlayer = state.currentPlayer === 'r' ? 'b' : 'r';

  return { success: true };
}

