import { getCameraDevices } from './camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

(async () => {
  const cameraDevices = await getCameraDevices();
  ipcRenderer.send('webCamDevices', cameraDevices);
})();
