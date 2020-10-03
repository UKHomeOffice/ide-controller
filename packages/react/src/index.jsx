// Global imports
import React from 'react';
import ReactDOM from 'react-dom';
import { initAll } from 'govuk-frontend';
import 'govuk-frontend/govuk/all.scss';
import './Components/Style/atoms.scss';
import './Components/Style/global.scss';

// Local imports
import App from './App';
import { getCameraDevices } from './helpers/camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

(async () => {
  const cameraDevices = await getCameraDevices();
  ipcRenderer.send('webCamDevices', cameraDevices);
})();

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
