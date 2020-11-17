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
    const stringifiedEntry = this.stringifyEntry(key, value);
    this.writeToLogFile(stringifiedEntry, true);
  }

  setExact(value) {
    this.writeToLogFile(value);
  }

  stringifyEntry(key, value) {
    const stringifiedEntry = JSON.stringify({
      [key]: value,
      timestamp: Date.now(),
    });

    return stringifiedEntry;
  }

  writeToLogFile(data, withComma = false) {
    const includeComma = withComma ? ',' : '';
    const strData = `${data}${includeComma}\n`;
    fs.appendFile(this.path, strData, function (error) {
      if (error) this.failedToLog(error);
    });
  }

  failedToLog(error) {
    this.set({ error: error });
    this.set('ERROR', 'CAN NOT LOG');
  }
}

module.exports = Store;
