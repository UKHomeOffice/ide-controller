// Global imports
import React from 'react';
import ReactDOM from 'react-dom';
import { initAll } from 'govuk-frontend';
import 'govuk-frontend/govuk/all.scss';

// Local imports
import App from './App';
import './Components/Style/atoms.scss';
import './Components/Style/global.scss';
import './Components/Style/molecules.scss';
import './helpers/ipcMainEvents';

document.body.className = document.body.className
  ? `${document.body.className} js-enabled`
  : 'js-enabled';

initAll();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
