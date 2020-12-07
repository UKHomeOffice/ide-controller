// Global imports
const electron = require('electron');
const path = require('path');
const Logger = require('nedb-logger');
const os = require('os');

// Local imports
const packagejson = require('./package.json');

class Store {
  constructor(fileName = 'ide-controller-log.db') {
    const appDataPath = electron.app.getPath('appData');
    this.path = path.join(appDataPath, `IDE/${fileName}`);
    this.logger = new Logger({ filename: this.path });
  }

  set(key, value, trackEventName) {
    let logData = value ? { [key]: value } : key;
    logData = trackEventName ? { ...logData, trackEventName } : logData;
    this.logger.insert({
      ...logData,
      created_at: Date.now(),
      version: packagejson.version,
      device: os.hostname(),
    });
  }

  failedToLog(error) {
    this.set({ error: error });
    this.set('ERROR', 'CAN NOT LOG');
  }
}

module.exports = Store;
