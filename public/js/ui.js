/**
 * UI rendering and update functions
 */

import { elt, showMessage } from './domUtils.js';
import { PLAYER_COLORS, PLAYER_NAMES } from './config.js';

/**
 * Rendert das Spielfeld basierend auf dem aktuellen State
 * @param {Object} state - The game state
 */
export function renderBoard(state) {
  const boardElement = document.querySelector('.board');
  boardElement.innerHTML = '';

  for (let row = 0; row < state.board.length; row++) {
    for (let col = 0; col < state.board[row].length; col++) {
      const cellValue = state.board[row][col];
      let field;

      const attrs = {
        'class': 'field',
        'data-row': String(row),
        'data-col': String(col)
      };

      if (cellValue === 'b') {
        const bluePiece = elt('div', { class: 'blue piece' });
        field = elt('div', attrs, bluePiece);
      } else if (cellValue === 'r') {
        const redPiece = elt('div', { class: 'red piece' });
        field = elt('div', attrs, redPiece);
      } else {
        field = elt('div', attrs);
      }

      boardElement.appendChild(field);
    }
  }

  updateCurrentPlayerDisplay(state);
}

/**
 * Aktualisiert die Anzeige des aktuellen Spielers
 * @param {Object} state - The game state
 */
export function updateCurrentPlayerDisplay(state) {
  const statusDiv = document.querySelector('.status');

  if (state.gameOver) {
    if (state.winner) {
      const winnerName = PLAYER_NAMES[state.winner];
      const winnerColor = PLAYER_COLORS[state.winner];
      statusDiv.innerHTML = `Gewinner: <span class="current-player" id="currentPlayer"></span> ${winnerName}!`;
      // Element nach innerHTML-Änderung neu abfragen
      const playerIndicator = document.getElementById('currentPlayer');
      if (playerIndicator) {
        playerIndicator.style.backgroundColor = winnerColor;
      }
    } else {
      statusDiv.innerHTML = 'Unentschieden!';
    }
  } else {
    const currentColor = PLAYER_COLORS[state.currentPlayer];
    statusDiv.innerHTML = 'Nächster Zug: <span class="current-player" id="currentPlayer"></span>';
    // Element nach innerHTML-Änderung neu abfragen
    const playerIndicator = document.getElementById('currentPlayer');
    if (playerIndicator) {
      playerIndicator.style.backgroundColor = currentColor;
    }
  }
}

/**
 * Aktualisiert den Undo-Button (aktiviert/deaktiviert)
 * @param {Object} state - The game state
 */
export function updateUndoButton(state) {
  const undoBtn = document.getElementById('undoBtn');
  if (undoBtn) {
    undoBtn.disabled = state.history.length === 0;
  }
}

/**
 * Shows game over message
 * @param {Object} result - Result from makeMove
 */
export function showGameOverMessage(result) {
  if (result.winner) {
    const winnerName = PLAYER_NAMES[result.winner];
    showMessage(`🎉 ${winnerName} hat gewonnen! 🎉`, 'success', true);
  } else if (result.draw) {
    showMessage('Unentschieden! Das Spielfeld ist voll.', 'info', true);
  }
}

