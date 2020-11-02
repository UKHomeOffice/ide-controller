const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(fileName = 'ide-controller') {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );
    this.path = path.join(userDataPath, `${fileName}.db`);
  }

  set(key, value) {
    fs.appendFile(
      this.path,
      `${JSON.stringify({
        [key]: typeof value === 'object' ? JSON.stringify(value) : value,
        timestamp: Date.now(),
      })},\n`,
      function (err) {
        if (err) throw err;
      }
    );
  }
}

module.exports = Store;
