const path = require('path');

module.exports = {
  appId: 'com.homeoffice.ide-controller',
  copyright: 'Copyright Home Office',
  extraFiles: [
    {
      from: path.resolve(__dirname, '../react/build/'),
      to: 'Resources/react/build/'
    }
  ],
  mac: {
    category: 'public.app-category.utilities',
    target: 'dmg'
  },
  win: {
    target: 'zip'
  }
}