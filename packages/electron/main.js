// Modules
const { app, Menu } = require('electron');

const network = require('network');

// Local imports
const { isDev, isWindows } = require('./util/helpers.js');
const buildIdeMenu = require('./menu');
const { createWindow, executeWindowsCommand } = require('./util/windows');
const Store = require('./util/Store');
const watchIDEUpdateDir = require('./util/IDEUpdateExeWatcher');
const { initWebCamDevices } = require('./util/ipcMain');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const userStore = new Store();

// Set application menu
Menu.setApplicationMenu(buildIdeMenu());

// Electron `app` is ready
app.on('ready', () => {
  createWindow(mainWindow);
  initWebCamDevices();
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

app.commandLine.appendSwitch('high-dpi-support', 1);
app.commandLine.appendSwitch('force-device-scale-factor', 1);

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
