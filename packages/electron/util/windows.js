// Global imports
const { exec } = require('child_process');
const {
  app,
  nativeImage,
  BrowserWindow,
  systemPreferences,
} = require('electron');
const path = require('path');

// Local imports
const { isDev, isMac } = require('./helpers.js');
const Store = require('./Store');

const userStore = new Store();

const executeWindowsCommand = (command, args = []) => {
  if (process.platform !== 'win32') return;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      userStore.set('Exec Command Error', 'ERROR', error);
      return;
    }
    userStore.set('Exec Command stdout', 'SUCCESS', stdout);
    userStore.set('Exec Command stderr', 'SUCCESS', stderr);
  });
};

// Create a new BrowserWindow when `app` is ready
const createWindow = (mainWindow) => {
  mainWindow = new BrowserWindow({
    // frame: false,
    width: isDev ? 2600 : 1920,
    height: 1280,
    resizable: isDev,
    titleBarStyle: isDev ? '' : 'hidden',
    backgroundColor: '#fff',
    webPreferences: { nodeIntegration: true },
  });

  if (isMac) {
    const image = nativeImage.createFromPath(
      path.resolve(__dirname, 'build/icon.png')
    );
    app.dock.setIcon(image);
    systemPreferences.askForMediaAccess('camera');
  }
  const status = systemPreferences.getMediaAccessStatus('camera');
  if (status !== 'granted') {
    // Log device does not have access to camera
  }

  // Load index.html into the new BrowserWindow
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.setFullScreen(true);
    mainWindow.loadFile(
      path.resolve(__dirname, '../../react/build/index.html')
    );
  }

  // Open DevTools - Remove for PRODUCTION!
  if (isDev) mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', app.quit);
};

const sendSelectedCamera = (mainWindow, device) => {
  mainWindow.webContents.send('webCamDevices', device);
};

const createCameraListSubmenu = (mainWindow, list) =>
  list.map((device) => ({
    label: device.label.split('(')[0],
    click() {
      sendSelectedCamera(mainWindow, device);
    },
  }));

module.exports = {
  createWindow,
  createCameraListSubmenu,
  executeWindowsCommand,
};
