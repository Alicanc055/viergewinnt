/**
 * Configuration module for Connect 4 game
 * Contains all configuration constants and environment detection
 */

// Auto-detect: Use localhost if available, otherwise use localStorage (GitHub Pages)
export const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
export const API_URL = IS_GITHUB_PAGES ? null : 'http://localhost:3000';
export const DATA_KEY = 'c4state';
export const API_KEY = 'c4game';

// Game configuration
export const ROWS = 6;
export const COLS = 7;
export const WIN_LENGTH = 4;

// Player colors
export const PLAYER_COLORS = {
  r: '#f44336',
  b: '#2196F3'
};

// Player names
export const PLAYER_NAMES = {
  r: 'Rot',
  b: 'Blau'
};

