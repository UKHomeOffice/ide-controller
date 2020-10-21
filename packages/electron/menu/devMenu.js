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
        label: 'Trigger Scan Document With Chip',
        accelerator: 'F1',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithChip) {
              readerServer.triggerWithChip();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document Without Chip',
        accelerator: 'F2',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.triggerWithoutChip();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
    ],
  },
];

module.exports = devMenu;
