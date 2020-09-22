const {Menu} = require('electron')
const common = require('./common');

const devMenu = Menu.buildFromTemplate([
  ...common
]);

module.exports = devMenu;