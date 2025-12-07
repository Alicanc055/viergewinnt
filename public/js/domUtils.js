/**
 * DOM utility functions
 */

/**
 * Hilfsfunktion zum Erstellen von DOM-Elementen
 * @param {string} type - Der Element-Typ (z.B. 'div', 'span')
 * @param {Object} attrs - Die Attribute des Elements
 * @param {...(Node|string)} children - Die Kind-Elemente
 * @returns {HTMLElement} Das erstellte Element
 */
export function elt(type, attrs, ...children) {
  let node = document.createElement(type);
  Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key]);
  });
  for (let child of children) {
    if (typeof child != "string")
      node.appendChild(child);
    else
      node.appendChild(document.createTextNode(child));
  }
  return node;
}

/**
 * Zeigt eine Nachricht an
 * @param {string} text - Der anzuzeigende Text
 * @param {string} type - Der Nachrichtentyp ('success', 'error', 'info')
 * @param {boolean} persistent - Wenn true, wird die Nachricht nicht automatisch ausgeblendet
 */
export function showMessage(text, type = 'info', persistent = false) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  if (!persistent) {
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 3000);
  }
}

