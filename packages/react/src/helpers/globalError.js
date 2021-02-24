import { sendToElectronStore } from './ipcMainEvents';

window.onerror = (message, source, lineno, colno, error) => {
  sendToElectronStore('React Error', 'ERROR', {
    message,
    source,
    lineno,
    colno,
    error,
  });
};
