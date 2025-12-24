
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function initApp() {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Could not find root element to mount to");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error mounting React app:', error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; color: red; font-family: sans-serif;">
          <h1>Erro ao carregar a aplicação</h1>
          <p>${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
          <p>Verifique o console para mais detalhes.</p>
        </div>
      `;
    }
  }
}

// Aguarda o DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
