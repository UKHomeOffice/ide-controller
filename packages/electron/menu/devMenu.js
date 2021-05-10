const readerServer = require('../../idemia-reader-mock');

const triggerAction = (functionName) => {
  const tryAgain = setInterval(() => {
    const readerServerFunction = readerServer[functionName];
    if (readerServerFunction) {
      readerServerFunction();
      clearInterval(tryAgain);
    }
  }, 1000);
};

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
        click: () => triggerAction('triggerWithChip'),
      },
      {
        label: 'Trigger Scan Document Without Chip',
        accelerator: 'F2',
        click: () => triggerAction('triggerWithoutChip'),
      },
      {
        label: 'Trigger Scan Document With Chip Slow',
        accelerator: 'F3',
        click: () => triggerAction('triggerWithChipSlow'),
      },
      {
        label: 'Trigger Scan Document With PACE',
        accelerator: 'F4',
        click: () => triggerAction('triggerWithPACE'),
      },
      {
        label: 'Trigger Front Side ID Scan Document',
        accelerator: 'F5',
        click: () => triggerAction('triggerWithIDFront'),
      },
      {
        label: 'Trigger Back Side ID Scan Document',
        accelerator: 'F6',
        click: () => triggerAction('triggerWithIDBack'),
      },
      {
        label: 'Trigger Scan Document data00',
        accelerator: 'F7',
        click: () => triggerAction('data00'),
      },
      {
        label: 'Trigger Scan Document data02',
        accelerator: 'F8',
        click: () => triggerAction('data02'),
      },
      {
        label: 'Trigger Scan Document data04',
        accelerator: 'F9',
        click: () => triggerAction('data04'),
      },
      {
        label: 'Trigger Scan Document MRZ Covered',
        accelerator: 'F10',
        click: () => triggerAction('mrzCovered'),
      },
    ],
  },
];

module.exports = devMenu;
