// Modules
const { app, ipcMain, Menu, MenuItem } = require('electron');
const ApplicationInsightsLogger = require('azure-application-insights');
const fs = require('fs');
const network = require('network');

// Local imports
const { isDev, isWindows } = require('./util/helpers.js');
const buildIdeMenu = require('./menu');
const {
  createWindow,
  createCameraListSubmenu,
  executeWindowsCommand,
} = require('./util/windows');
const Store = require('./util/Store');
const watchIDEUpdateDir = require('./util/IDEUpdateExeWatcher');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, onlineStatusWindow;
const userStore = new Store();

// Set application menu
Menu.setApplicationMenu(buildIdeMenu());

// Electron `app` is ready
app.on('ready', () => {
  createWindow(mainWindow);
  if (isWindows) {
    watchIDEUpdateDir(userStore);
  }
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', app.quit);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  // Create a new BrowserWindow when `app` is ready
  if (mainWindow === null) createWindow(mainWindow);
});

ipcMain.on('webCamDevices', (event, list) => {
  const ideMenu = buildIdeMenu();
  let cameraList = ideMenu.getMenuItemById('cameraList');
  const cameraListMenuItem = new MenuItem({
    id: 'cameraList',
    label: 'Camera List',
    submenu: createCameraListSubmenu(mainWindow, list),
  });
  if (cameraList) {
    cameraList = cameraListMenuItem;
  } else {
    ideMenu.append(cameraListMenuItem);
  }

  Menu.setApplicationMenu(ideMenu);
});

const logFilePath = `${app.getPath('appData')}/IDE/ide-controller-log.db`;
const applicationInsightsLogger = new ApplicationInsightsLogger(logFilePath);

ipcMain.on('online-status-changed', (event, status) => {
  onlineStatusWindow = status; // eslint-disable-line
  const isOnline = status === 'online';
  applicationInsightsLogger.setIsOnline(isOnline);
  network.get_active_interface((_, result) => {
    if (result) userStore.set('Network Interface Change', 'SUCCESS', result);
  });
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

/* On node actions */
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
network.get_active_interface((_, result) => {
  if (result) userStore.set('Network Interface', 'SUCCESS', result);
});

/* On prod actions */
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
