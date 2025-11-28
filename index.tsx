import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("React Mount Error:", error);
  rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h3>Application Crash</h3><pre>${error instanceof Error ? error.message : 'Unknown error'}</pre></div>`;
}