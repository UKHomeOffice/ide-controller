const {Menu} = require('electron')
const common = require('./common');

const devMenu = Menu.buildFromTemplate([
  ...common,
  {
    label: 'Developer',
    submenu: [
      { role: 'services' },
      { role: 'toggledevtools' },
    ]
  }
]);

module.exports = devMenu;