const electron = require('electron');
const path = require('path');
const Logger = require('nedb-logger');
class Store {
  constructor(fileName = 'ide-controller-log.db') {
    const appDataPath = electron.app.getPath('appData');
    this.path = path.join(appDataPath, `IDE/${fileName}`);
    this.logger = new Logger({ filename: this.path });
  }

  set(key, value) {
    const logData = value ? { [key]: value } : key;
    this.logger.insert({ ...logData, created_at: Date.now() });
  }

  failedToLog(error) {
    this.set({ error: error });
    this.set('ERROR', 'CAN NOT LOG');
  }
}

module.exports = Store;
