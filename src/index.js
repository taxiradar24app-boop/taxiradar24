import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✔️ Ruta válida si App.js está en el raíz del proyecto
import './globalStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
