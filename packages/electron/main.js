// Modules
const {app, BrowserWindow, nativeImage, systemPreferences, ipcMain, Menu, MenuItem} = require('electron')
const path = require('path');

// Local imports
const ideMenu =  require('./menu')

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

  if (process.platform === 'darwin') { 
    const image = nativeImage.createFromPath(path.resolve(__dirname, 'build/icon.png'))
    app.dock.setIcon(image) 
    systemPreferences.askForMediaAccess('camera');
  } 
  const status = systemPreferences.getMediaAccessStatus('camera')
  if(status !== 'granted') {
    // Log device does not have access to camera
  }

  // Load index.html into the new BrowserWindow
  if (process.env.ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.resolve(__dirname, '../react/build/index.html'));
  }

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Set application menu
Menu.setApplicationMenu(ideMenu)

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', app.quit)

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

const createCameraListSubmenu = (list) => (
  list.map(device => ({
    label: device.label.split('(')[0],
    click() { sendSelectedCamera(device)}
  }))
);

const sendSelectedCamera = (device) => {
  mainWindow.webContents.send('webCamDevices', device);
}

ipcMain.on('webCamDevices', (event, list) => {
  // if (data.length <= 1) return;
  ideMenu.append(new MenuItem({
    label: 'Camera List',
      submenu: createCameraListSubmenu(list)
  }))
  Menu.setApplicationMenu(ideMenu);
})