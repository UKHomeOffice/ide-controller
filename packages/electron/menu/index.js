const { app, Menu } = require('electron');
const devMenu = require('./devMenu');
const prodMenu = require('./prodMenu');

let ideMenu;
if (process.env.ENV === 'development') {
  ideMenu = devMenu;
} else {
  ideMenu = prodMenu;
}

const commonMenu = [
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
];

module.exports = Menu.buildFromTemplate([
  ...commonMenu,
  ...ideMenu
]);