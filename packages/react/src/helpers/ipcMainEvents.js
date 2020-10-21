import { getCameraDevices } from './camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

(async () => {
  const cameraDevices = await getCameraDevices();
  ipcRenderer.send('webCamDevices', cameraDevices);
})();

export const sendToElectronStore = (key, value) => {
  const strKey = typeof key === 'object' ? JSON.stringify(key) : key;
  const strValue = typeof value === 'object' ? JSON.stringify(value) : value;
  ipcRenderer.invoke('addToStore', strKey, strValue);
};

export const saveToDesktop = (object) => {
  ipcRenderer.invoke('saveToDesktop', object);
};

export default {};
