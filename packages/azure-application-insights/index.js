// Local imports
const DB = require('./db');
const ApplicationInsights = require('./appInsights');

class ApplicationInsightsLogger {
  constructor(tableFullPath, trackEventName) {
    this.trackEventName = trackEventName || 'Unnamed Event';
    this.dbTable = new DB(tableFullPath);
    this.applicationInsights = new ApplicationInsights();
    this.isSyncing = false;
    this.error = '';
    this.isOnline = false;
  }

  sync() {
    // If offline do nothing
    if (!this.isOnline || this.isSyncing) return;
    /* Whenever new log is available this function is called
       this is not necessary as the sync will try to go through all logs
       So if sync is called while syncing nothing happens */
    this.isSyncing = true;

    this.dbTable.loadDatabase();
    this.dbTable
      .find({})
      .limit(100)
      .exec((error, entries) => {
        if (error) throw error;

        const noLogs = entries.length === 0;
        if (noLogs) {
          this.isSyncing = false;
          return;
        }

        this.sendTrackEvent(entries);
        this.confirmSync(entries);
      });
  }

  sendTrackEvent(entries) {
    entries.forEach((entry) => {
      const trackEventName = entry.trackEventName || this.trackEventName;
      if (entry.eventType === 'ERROR') {
        this.applicationInsights.trackException(entry);
      } else {
        this.applicationInsights.trackEvent(trackEventName, entry);
      }
    });
  }

  confirmSync(entries) {
    const bufferInterval = setInterval(() => {
      const bufferIsNotEmpty = !this.applicationInsights.isEmptyBuffer();
      if (bufferIsNotEmpty) return;

      this.removeSyncedEntries(entries);
      this.isSyncing = false;
      this.sync();
      clearInterval(bufferInterval);
    }, 1000);
  }

  removeSyncedEntries(entries) {
    entries.forEach((entry) => {
      this.dbTable.remove({ _id: entry._id });
    });
  }

  setIsOnline(isOnline) {
    this.isOnline = isOnline;

    if (isOnline) this.sync();
  }
}

module.exports = ApplicationInsightsLogger;
