// Global imports
const { watch } = require('fs');

const watchIDEUpdateDir = (userStore) => {
  watch('C:\\IDEUpdate\\', 'utf8', (eventType, filename) => {
    if (filename.endsWith('.exe')) {
      userStore.set('IntuneLog', '.exe File Update', {
        filename,
      });
    }
  });
};

module.exports = watchIDEUpdateDir;
