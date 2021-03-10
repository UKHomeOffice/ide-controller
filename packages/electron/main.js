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
const ApplicationInsightsLogger = require('azure-application-insights');

// Local imports
const buildIdeMenu = require('./menu');
const Store = require('./store');
const executeWindowsCommand = require('./util/windows');
const watchIDEUpdateDir = require('./util/IDEUpdateExeWatcher');
const { isDev, isWindows, isMac } = require('./util/helpers.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, onlineStatusWindow;
const userStore = new Store();

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
    mainWindow.loadFile(path.resolve(__dirname, '../react/build/index.html'));
  }

  // Open DevTools - Remove for PRODUCTION!
  if (isDev) mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', app.quit);
}

// Set application menu
Menu.setApplicationMenu(buildIdeMenu());

// Electron `app` is ready
app.on('ready', () => {
  createWindow();
  if (isWindows) {
    watchIDEUpdateDir(userStore);
  }
});

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
  const ideMenu = buildIdeMenu();
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

ipcMain.handle('addToStore', (event, name, type, data) => {
  userStore.set(name, type, data);
  applicationInsightsLogger.sync();
});

ipcMain.handle('saveToDesktop', (_, object) => {
  fs.appendFileSync(
    `${app.getPath('desktop')}/data.json`,
    `${JSON.stringify(object)},`
  );
});

process.on('exit', (code) => {
  userStore.set('Application Status', 'INFO', {
    ApplicationExit: 'Success',
  });
});

process.on('uncaughtException', (err, origin) => {
  userStore.set('Electron ERROR', 'ERROR', { error: err, origin });
});
process.on('warning', (warning) => {
  userStore.set('Electron WARNING', 'WARNING', { warning });
});
userStore.set('Application Status', 'SUCCESS', { ApplicationStart: 'Success' });
userStore.set('Network Status', 'SUCCESS', os.networkInterfaces());

if (!isDev) {
  /* eslint-disable */
  executeWindowsCommand(
    'Start "Doc Reader" /b "%JAVA_HOME%\javaw.exe" -jar "%IDE_DOCUMENT_READER%"'
  );
  executeWindowsCommand(
    'Start "MorphoKit" /D "%MORPHO_HOME%" /b "%JAVA_HOME%\javaw.exe" -jar "%IDE_BIOMETRICS%"'
  );
    /* eslint-enable */
}
