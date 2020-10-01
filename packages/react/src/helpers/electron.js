const electron = window.require('electron');
const { ipcRenderer } = electron;

export const initOnlineStatus = () => {
  const updateOnlineStatus = () => {
    ipcRenderer.send(
      'online-status-changed',
      navigator.onLine ? 'online' : 'offline'
    );
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
};

export default {};
