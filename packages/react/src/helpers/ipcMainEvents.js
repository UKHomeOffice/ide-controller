import { getCameraDevices } from './camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

(async () => {
  const cameraDevices = await getCameraDevices();
  ipcRenderer.send('webCamDevices', cameraDevices);
})();

export const sendToElectronStore = (key, value) => {
  ipcRenderer.invoke('addToStore', key, value);
};

export const saveToDesktop = (object) => {
  ipcRenderer.invoke('saveToDesktop', object);
};

export default {};
