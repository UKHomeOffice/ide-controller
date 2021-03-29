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
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            selector: 'redo:',
          },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            selector: 'selectAll:',
          },
        ],
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
      {
        label: 'Trigger Scan Document With Chip Slow',
        accelerator: 'F3',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithChipSlow) {
              readerServer.triggerWithChipSlow();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document With PACE',
        accelerator: 'F4',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.triggerWithPACE();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Front Side ID Scan Document',
        accelerator: 'F5',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.triggerWithIDFront();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Back Side ID Scan Document',
        accelerator: 'F6',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.triggerWithIDBack();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document data00',
        accelerator: 'F7',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.data00();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document data02',
        accelerator: 'F8',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.data02();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document data04',
        accelerator: 'F9',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.data04();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
      {
        label: 'Trigger Scan Document MRZ Covered',
        accelerator: 'F10',
        click: () => {
          const tryAgain = setInterval(() => {
            if (readerServer.triggerWithoutChip) {
              readerServer.mrzCovered();
              clearInterval(tryAgain);
            }
          }, 1000);
        },
      },
    ],
  },
];

module.exports = devMenu;
