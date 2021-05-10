// Global imports
const electron = require('electron');
const path = require('path');
const Logger = require('nedb-logger');
const os = require('os');

// Local imports
const packagejson = require('../package.json');

class Store {
  constructor(fileName = 'ide-controller-log.db') {
    const appDataPath = electron.app.getPath('appData');
    this.path = path.join(appDataPath, `IDE/${fileName}`);
    this.logger = new Logger({ filename: this.path });
  }

  set(eventName, eventType, ...args) {
    this.logger.insert({
      ...args[0],
      trackEventName: eventName,
      eventType,
      created_at: Date.now(),
      version: packagejson.version,
      device: os.hostname(),
    });
  }

  failedToLog(error) {
    this.set('Log Error', 'ERROR', { error: error });
  }
}

module.exports = Store;
