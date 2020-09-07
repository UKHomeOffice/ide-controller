// Global imports
import React from 'react';
import ReactDOM from 'react-dom';
import { initAll } from 'govuk-frontend';

// Local imports
import './index.css';
import App from './App';

initAll();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
