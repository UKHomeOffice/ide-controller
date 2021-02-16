const { app, Menu } = require('electron');

let ideMenu;
if (process.env.ENV === 'development') {
  const devMenu = require('./devMenu');
  ideMenu = devMenu;
} else {
  const prodMenu = require('./prodMenu');
  ideMenu = prodMenu;
}

const commonMenu = [
  {
    label: app.name,
    submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    label: 'Window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  },
];

module.exports = () => Menu.buildFromTemplate([...commonMenu, ...ideMenu]);
