// Global imports
const path = require('path');
const appInsights = require('applicationinsights');

require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

appInsights.setup(process.env.IKEY).setUseDiskRetryCaching(true).start();

class ApplicationInsights {
  constructor() {
    this.client = appInsights.defaultClient;
  }

  trackEvent(trackEventName, entry) {
    this.client.trackEvent({
      name: trackEventName,
      properties: entry,
    });
  }

  trackException(entry) {
    this.client.trackException({
      exception: JSON.stringify(entry),
    });
  }

  isEmptyBuffer() {
    return this.client.channel._buffer.length === 0;
  }
}

module.exports = ApplicationInsights;
