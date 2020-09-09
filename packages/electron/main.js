// Modules
const {app, BrowserWindow, screen} = require('electron')
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    // frame: false,
    width: 1800,
    height: 1200,
    resizable: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#fff',
    webPreferences: { nodeIntegration: true },
  })

  if (process.platform === 'darwin') app.dock.setIcon('./build/icon.png')


  // Load index.html into the new BrowserWindow
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadFile(path.resolve(__dirname, '../react/build/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', app.quit)

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})