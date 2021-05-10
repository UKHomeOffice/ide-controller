// Global imports
const { exec } = require('child_process');

// Local imports
const Store = require('./Store');

const userStore = new Store();

const executeWindowsCommand = (command, args = []) => {
  if (process.platform !== 'win32') return;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      userStore.set('Exec Command Error', 'ERROR', error);
      return;
    }
    userStore.set('Exec Command stdout', 'SUCCESS', stdout);
    userStore.set('Exec Command stderr', 'SUCCESS', stderr);
  });
};

module.exports = executeWindowsCommand;
