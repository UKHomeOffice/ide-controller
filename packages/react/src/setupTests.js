window.require = jest.fn(() => ({
  ipcRenderer: { send: jest.fn(), invoke: jest.fn(), on: jest.fn() },
}));

const promise = Promise.resolve();
global.navigator.mediaDevices = {
  getUserMedia: jest.fn(() => promise),
  enumerateDevices: jest.fn(() => Promise.resolve([])),
};
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
