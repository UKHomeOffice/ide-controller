const path = require('path');

module.exports = {
  appId: 'com.homeoffice.ide-controller',
  copyright: 'Copyright Home Office',
  extraFiles: [
    {
      from: path.resolve(__dirname, '../react/build/'),
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
};
