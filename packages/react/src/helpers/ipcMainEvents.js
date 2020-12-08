import { getCameraDevices } from './camera';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export const sendCameraDevices = async () => {
  const cameraDevices = await getCameraDevices();
  ipcRenderer.send('webCamDevices', cameraDevices);
};

export const sendGeolocation = async () => {
  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    ipcRenderer.invoke('addToStore', 'Location', crd);
  };

  const error = (error) => {};
  navigator.geolocation.getCurrentPosition(success, error, options);
};

export const sendToElectronStore = (key, value) => {
  ipcRenderer.invoke('addToStore', key, value);
};

export const saveToDesktop = (object) => {
  ipcRenderer.invoke('saveToDesktop', object);
};

export default {};
