/*
 *  For more information please refer to 👇 documentation
 *  https://github.com/DevExpress/testcafe-browser-provider-electron
 */

const path = require('path');

const reactBuildPath = path.resolve(__dirname, '../react/build/index.html');

module.exports = {
  mainWindowUrl: reactBuildPath,
  appPath: "./",
  // appArgs: ["--env=development"],
}
