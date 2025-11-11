/**
 * Web Entry Point for React Native Web
 * Production-ready with error handling
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import App from '../App.web';

// Global error handlers for better debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}

// Ensure root element exists
let container = document.getElementById('root');
if (!container) {
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
}

// Render the app
try {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: system-ui;">
      <h1 style="color: #dc3545;">⚠️ Error Loading App</h1>
      <p style="color: #666;">${errorMessage}</p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Check console for details</p>
    </div>
  `;
}
