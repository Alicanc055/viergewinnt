/**
 * Main application module
 * Initializes the game and sets up event handlers
 */

import { createInitialState, makeMove, undoFromHistory } from './gameLogic.js';
import { renderBoard, updateUndoButton, showGameOverMessage } from './ui.js';
import { showMessage } from './domUtils.js';
import { saveGameState, loadGameState } from './storage.js';
import { IS_GITHUB_PAGES, PLAYER_NAMES } from './config.js';

// Game state
let state = createInitialState();

/**
 * Handler für Klicks auf Spielfelder
 * Verwendet Event-Delegation auf dem Board-Element
 */
function handleBoardClick(event) {
  // Blockiere Klicks, wenn das Spiel vorbei ist
  if (state.gameOver) {
    if (state.winner) {
      const winnerName = PLAYER_NAMES[state.winner];
      showMessage(`🎉 ${winnerName} hat gewonnen! 🎉 Klicke auf "Neues Spiel" um neu zu starten.`, 'success', true);
    } else {
      showMessage('Unentschieden! Klicke auf "Neues Spiel" um neu zu starten.', 'info', true);
    }
    return;
  }

  let clickedField = event.target;

  // Wenn auf die Figur geklickt wurde, gehe zum Eltern-Element (field)
  if (clickedField.classList.contains('piece')) {
    clickedField = clickedField.parentElement;
  }

  // Prüfe, ob es wirklich ein Feld ist
  if (!clickedField.classList.contains('field')) {
    return;
  }

  const col = parseInt(clickedField.getAttribute('data-col'));

  // Make the move
  const result = makeMove(state, col);

  if (!result.success) {
    showMessage(result.message, 'error');
    return;
  }

  // Render the board
  renderBoard(state);
  updateUndoButton(state);

  // Show game over message if applicable
  if (result.winner || result.draw) {
    showGameOverMessage(result);
  }
}

/**
 * Macht den letzten Zug rückgängig
 */
function handleUndo() {
  const success = undoFromHistory(state);

  if (!success) {
    showMessage('Keine Züge zum Rückgängigmachen!', 'info');
    return;
  }

  renderBoard(state);
  updateUndoButton(state);
  showMessage('Zug rückgängig gemacht', 'info');
}

/**
 * Setzt das Spiel zurück
 */
function handleNewGame() {
  state = createInitialState();
  renderBoard(state);
  updateUndoButton(state);
  showMessage('Neues Spiel gestartet', 'success');
}

/**
 * Handles save button click
 */
async function handleSave() {
  await saveGameState(state);
}

/**
 * Handles load button click
 */
async function handleLoad() {
  const loadedState = await loadGameState();

  if (!loadedState) {
    return; // Error message already shown by loadGameState
  }

  // Update state
  state.board = loadedState.board;
  state.currentPlayer = loadedState.currentPlayer;
  state.gameOver = loadedState.gameOver;
  state.winner = loadedState.winner;
  state.history = []; // Clear history when loading

  // Render the board
  renderBoard(state);
  updateUndoButton(state);

  // Show appropriate message
  const mode = IS_GITHUB_PAGES ? ' (Offline-Modus)' : '';
  if (state.gameOver && state.winner) {
    const winner = PLAYER_NAMES[state.winner];
    showMessage(`Geladenes Spiel: ${winner} hat gewonnen!${mode}`, 'info', true);
  } else if (state.gameOver) {
    showMessage(`Geladenes Spiel: Unentschieden!${mode}`, 'info', true);
  } else {
    showMessage(`Spielstand erfolgreich geladen!${mode}`, 'success');
  }
}

/**
 * Initialize the application
 */
export function initApp() {
  try {
    console.log('Initializing Connect 4 app...');

    // Check if required DOM elements exist
    const board = document.querySelector('.board');
    const newGameBtn = document.getElementById('newGameBtn');
    const undoBtn = document.getElementById('undoBtn');
    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');

    if (!board || !newGameBtn || !undoBtn || !saveBtn || !loadBtn) {
      console.error('Required DOM elements not found!');
      return;
    }

    // Event-Delegation: Ein Event-Listener auf dem gesamten Board
    board.addEventListener('click', handleBoardClick);

    // Button-Event-Listener
    newGameBtn.addEventListener('click', handleNewGame);
    undoBtn.addEventListener('click', handleUndo);
    saveBtn.addEventListener('click', handleSave);
    loadBtn.addEventListener('click', handleLoad);

    // Initial rendering
    renderBoard(state);
    updateUndoButton(state);

    console.log('Connect 4 app initialized successfully!');
  } catch (error) {
    console.error('Error initializing app:', error);
    alert('Fehler beim Laden der Anwendung. Bitte Seite neu laden.');
  }
}

