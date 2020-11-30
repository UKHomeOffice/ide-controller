// Modules
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  Menu,
  MenuItem,
  systemPreferences,
} = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Local imports
const ideMenu = require('./menu');
const Store = require('./store');
const executeWindowsCommand = require('./util/windows');
const ApplicationInsightsLogger = require('@ide-controller/azure-application-insights');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, onlineStatusWindow;

const isDev = process.env.ENV === 'development';

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    // frame: false,
    width: 1920,
    height: 1280,
    resizable: isDev,
    titleBarStyle: isDev ? '' : 'hidden',
    backgroundColor: '#fff',
    webPreferences: { nodeIntegration: true },
  });

  if (process.platform === 'darwin') {
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
    mainWindow.loadFile(path.resolve(__dirname, '../react/build/index.html'));
  }

  // Open DevTools - Remove for PRODUCTION!
  if (isDev) mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', app.quit);
}

// Set application menu
Menu.setApplicationMenu(ideMenu);

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', app.quit);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

const createCameraListSubmenu = (list) =>
  list.map((device) => ({
    label: device.label.split('(')[0],
    click() {
      sendSelectedCamera(device);
    },
  }));

const sendSelectedCamera = (device) => {
  mainWindow.webContents.send('webCamDevices', device);
};

ipcMain.on('webCamDevices', (event, list) => {
  let cameraList = ideMenu.getMenuItemById('cameraList');
  const cameraListMenuItem = new MenuItem({
    id: 'cameraList',
    label: 'Camera List',
    submenu: createCameraListSubmenu(list),
  });
  if (cameraList) {
    cameraList = cameraListMenuItem;
  } else {
    ideMenu.append(cameraListMenuItem);
  }

  Menu.setApplicationMenu(ideMenu);
});

const logFilePath = `${app.getPath('appData')}/IDE/ide-controller-log.db`;
const applicationInsightsLogger = new ApplicationInsightsLogger(
  logFilePath,
  'Document Scan Event'
);

ipcMain.on('online-status-changed', (event, status) => {
  onlineStatusWindow = status; // eslint-disable-line
  const isOnline = status === 'online';
  applicationInsightsLogger.setIsOnline(isOnline);
});

const userStore = new Store();
ipcMain.handle('addToStore', (event, value) => {
  userStore.set(value);
  applicationInsightsLogger.sync();
});

ipcMain.handle('saveToDesktop', (_, object) => {
  fs.appendFileSync(
    `${app.getPath('desktop')}/data.json`,
    `${JSON.stringify(object)},`
  );
});

process.on('exit', (code) => {
  userStore.set('ApplicationExit', 'Process exit event');
});

process.on('uncaughtException', (err, origin) => {
  userStore.set('ERROR', { error: err, origin: origin });
});
process.on('warning', (warning) => {
  userStore.set('WARNING', { warning });
});
userStore.set('ApplicationStart', 'Success');
userStore.set('networkInterfaces', os.networkInterfaces());

/* eslint-disable */
executeWindowsCommand(
  'Start "Doc Reader" /b "%JAVA_HOME%\javaw.exe" -jar "%IDE_DOCUMENT_READER%"'
);
executeWindowsCommand(
  'Start "MorphoKit" /D "%MORPHO_HOME%" /b "%JAVA_HOME%\javaw.exe" -jar "%IDE_BIOMETRICS%"'
);
/* eslint-enable */
