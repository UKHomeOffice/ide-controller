const readerServer = require('../../idemia-reader-mock');

const devMenu = [
  {
    label: 'Developer',
    submenu: [
      {
        role: 'services',
      },
      {
        role: 'toggledevtools',
      },
      {
        label: 'Trigger Scan Document',
        accelerator: 'F1',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerScanEvents) {
              readerServer.triggerScanEvents();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
    ],
  },
];

module.exports = devMenu;
