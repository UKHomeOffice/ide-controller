module.exports = {
  title: 'IDE Controller Documentation',
  tagline: 'IDE Controller',
  url: 'https://pages.github.com/UKHomeOffice/ide-controller',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'UKHomeOffice',
  projectName: 'ide-controller', 
  themeConfig: {
    navbar: {
      title: 'IDE Controller',
      logo: {
        alt: 'IDE Controller',
        src: 'img/icon.png',
      },
      items: [
        {
          href: 'https://github.com/UKHomeOffice/ide-controller',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/viable-data',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/UKHomeOffice/ide-controller',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IDE Controller. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
