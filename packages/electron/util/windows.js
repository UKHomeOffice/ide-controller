// Global imports
const { exec } = require('child_process');

// Local imports
const Store = require('../store');

const userStore = new Store();

const executeWindowsCommand = (command, args = []) => {
  if (process.platform !== 'win32') return;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      userStore.set('exec error', error);
      return;
    }
    userStore.set('stdout', stdout);
    userStore.set('stderr', stderr);
  });
};

module.exports = executeWindowsCommand;
