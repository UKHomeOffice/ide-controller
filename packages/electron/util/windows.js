// Global imports
const { spawn } = require('child_process');

// Local imports
const Store = require('../store');

const userStore = new Store();

const executeWindowsCommand = (command, args = []) => {
  if (process.platform !== 'win32') return;

  const results = spawn(command, args);

  results.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    userStore.set('stdout', data);
  });

  results.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    userStore.set('stderr', data);
  });

  results.on('error', (error) => {
    console.log(`error: ${error.message}`);
    userStore.set('error', error);
  });

  results.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    userStore.set('close', `child process exited with code ${code}`);
  });
};

exports.module = executeWindowsCommand;
