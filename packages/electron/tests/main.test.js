import { getMainMenuItem } from 'testcafe-browser-provider-electron';

const path = require('path');

const reactBuildPath = path.resolve(__dirname, '../../react/build/index.html');

// To e2e test localhost use next line
// fixture`Electron test`.page('http://localhost:3000');
fixture`Electron test`.page(reactBuildPath);

test('Check the menu item role', async (t) => {
  const menuItem = await getMainMenuItem(['Window', { label: 'Minimize' }]);

  await t.expect(menuItem.role).eql('minimize');
});
