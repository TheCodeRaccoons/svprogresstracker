import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker.js';
import { BrowserRouter as Router } from 'react-router-dom';


const container = document.getElementById('root') as HTMLElement | null;
if (!container) {
  throw new Error('Root container with id "root" not found');
}
const root = createRoot(container);
// Use Vite's BASE_URL for correct subpath in production (e.g., /svprogresstracker/)
// React Router expects basename without trailing slash
const basename = (import.meta as any).env?.BASE_URL
  ? (import.meta as any).env.BASE_URL.replace(/\/$/, '')
  : '';

root.render(
  <Router basename={basename}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
