const { app, ipcMain, Menu, MenuItem } = require('electron');
const network = require('network');

const Store = require('./store');

const userStore = new Store();

const ApplicationInsightsLogger = require('azure-application-insights');
const fs = require('fs');

const buildIdeMenu = require('../menu');
const { createCameraListSubmenu } = require('./windows');

let onlineStatusWindow;

const initWebCamDevices = (mainWindow) => {
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
};

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

module.exports = {
  initWebCamDevices,
};
