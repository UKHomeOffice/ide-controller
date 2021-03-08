const isDev = process.env.ENV === 'development';

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

module.exports = {
  isDev,
  isWindows,
  isMac,
};
