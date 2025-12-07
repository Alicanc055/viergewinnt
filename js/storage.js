/**
 * Storage and API communication module
 * Handles saving and loading game state from server or localStorage
 */

import { IS_GITHUB_PAGES, API_URL, DATA_KEY, API_KEY } from './config.js';
import { showMessage } from './domUtils.js';

/**
 * Speichert den aktuellen Spielzustand auf dem Server oder in localStorage
 * Verwendet PUT-Request mit JSON-Body (Server) oder localStorage (GitHub Pages)
 * @param {Object} state - The game state to save
 */
export async function saveGameState(state) {
  try {
    // GitHub Pages: Use localStorage
    if (IS_GITHUB_PAGES || !API_URL) {
      localStorage.setItem(DATA_KEY, JSON.stringify(state));
      console.log('Spielstand im Browser gespeichert:', state);
      showMessage('Spielstand im Browser gespeichert! (Offline-Modus)', 'success');
      return;
    }

    // Local server: Use REST API
    const url = `${API_URL}/api/data/${DATA_KEY}?api-key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Spielstand gespeichert:', result);
    showMessage('Spielstand erfolgreich gespeichert!', 'success');
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    showMessage('Fehler beim Speichern: ' + error.message, 'error');
  }
}

/**
 * Lädt den Spielzustand vom Server oder aus localStorage
 * @returns {Object|null} The loaded game state or null if not found
 */
export async function loadGameState() {
  try {
    let loadedState;

    // GitHub Pages: Use localStorage
    if (IS_GITHUB_PAGES || !API_URL) {
      const savedData = localStorage.getItem(DATA_KEY);
      if (!savedData) {
        showMessage('Kein gespeicherter Spielstand gefunden!', 'error');
        return null;
      }
      loadedState = JSON.parse(savedData);
      console.log('Spielstand aus Browser geladen:', loadedState);
    } else {
      // Local server: Use REST API
      const url = `${API_URL}/api/data/${DATA_KEY}?api-key=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      loadedState = await response.json();
      console.log('Spielstand vom Server geladen:', loadedState);
    }

    // Ensure loaded state has proper structure
    if (!loadedState.history) {
      loadedState.history = [];
    }
    if (typeof loadedState.gameOver === 'undefined') {
      loadedState.gameOver = false;
    }
    if (!loadedState.winner) {
      loadedState.winner = null;
    }

    return loadedState;
  } catch (error) {
    console.error('Fehler beim Laden:', error);
    showMessage('Fehler beim Laden: ' + error.message, 'error');
    return null;
  }
}

