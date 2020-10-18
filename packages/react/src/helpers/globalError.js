import { sendToElectronStore } from './ipcMainEvents';

window.onerror = (message, source, lineno, colno, error) => {
  sendToElectronStore('reactError', { message, source, lineno, colno, error });
};
