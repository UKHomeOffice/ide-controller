const uuid = require('uuid');
const guid = `{${uuid.v4()}}`.toUpperCase();

module.exports = {
  appId: 'com.homeoffice.ide-controller',
  copyright: 'Copyright Home Office',
  extraFiles: [
    {
      from: 'react/build/',
      to: 'Resources/react/build/',
    },
  ],
  mac: {
    category: 'public.app-category.utilities',
    target: 'dmg',
    hardenedRuntime: true,
    entitlements: 'build/entitlements.mac.plist',
    extendInfo: {
      NSCameraUsageDescription:
        'This app requires camera access to record video.',
    },
  },
  win: {
    target: ['nsis'],
  },
  nsis: {
    guid: guid,
    installerIcon: 'build/icon.ico',
    uninstallerIcon: 'build/uninstallerIcon.ico',
    runAfterFinish: 'false',
    oneClick: true,
    include: 'build/installer.nsh',
    deleteAppDataOnUninstall: true,
    perMachine: true,
  },
};
