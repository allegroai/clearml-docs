/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */


const path = require('path');


module.exports = {
  title: 'ClearML',
  tagline: 'Auto-Magical Suite of tools to streamline your ML workflow',
  url: 'https://clear.ml',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'allegro.ai', // Usually your GitHub org/user name.
  projectName: 'ClearML', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    zoomSelector: '.markdown :not(em) > img',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
      // switchConfig: {
        // darkIcon: '\u{1F319}',
        // lightIcon: '\u{1F315}',
        // darkIconStyle: {
          // marginLeft: '2px',
        // },
        // lightIconStyle: {
          // marginLeft: '1px',
        // },
      // },
    },
    announcementBar: {
      id: 'supportus',
      content: 'If you ❤️ ️<b>ClearML</b>, ⭐️ us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/allegroai/clearml">GitHub</a>!',
      isCloseable: true,
    },
    navbar: {
      style: 'dark',
      hideOnScroll: true,
      title: ' ',
      logo: {
        alt: 'ClearML',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to:'/docs/hyperdatasets/overview',
          label: 'Hyper-Datasets',
          position: 'left',
        },
        // {to: 'tutorials', label: 'Tutorials', position: 'left'},
        // Please keep GitHub link to the right for consistency.
        {to: '/docs/guides', label: 'Examples', position: 'left'},
        //{to: '/docs/references', label: 'API', position: 'left'},
        {
          label: 'References',
          position: 'left', // or 'right'
          items: [
            {
              label: 'SDK',
              to: '/docs/references/sdk/task',
            },
            {
              label: 'ClearML Agent',
              to: '/docs/clearml_agent/clearml_agent_ref',
            },
            {
              label: 'Server API',
              to: '/docs/references/api',
            },
            {
              label: 'Hyper-Datasets',
              to: '/docs/references/hyperdataset',
            },

            {
              label: 'Release Notes',
              to: '/docs/release_notes/ver_1_11',
            },
            {
              label: 'Community Resources',
              to: '/docs/community',
            }
          ],
        },
        {
          label: 'FAQ',
          position: 'left', // or 'right'
          to: '/docs/faq'
        },
        {
          href: 'https://joinslack.clear.ml',
          position: 'right',
          className: 'header-ico header-ico--slack',
          'aria-label': 'Slack Channel',
        },
        {
          href: 'https://youtube.com/clearml',
          position: 'right',
          className: 'header-ico header-ico--youtube',
          'aria-label': 'YouTube',
        },
        {
          href: 'https://twitter.com/clearmlapp',
          position: 'right',
          className: 'header-ico header-ico--twitter',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://github.com/allegroai/clearml',
          position: 'right',
          className: 'header-ico header-ico--github',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://joinslack.clear.ml',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/ClearML',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/clearmlapp',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/clearml',
            },
            // {
            //   html: `
            //       <a href="https://twitter.com/clearmlapp" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
            //         <img src="img/twitter_logo_blue.svg" alt="Twitter" />
            //       </a>
            //     `,
            // },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://clear.ml/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/allegroai/clearml',
            },
          ],
        },
      ],
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} allegro.ai. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          breadcrumbs: false,
          editUrl:
            'https://github.com/allegroai/clearml-docs/edit/main/',
        },
        // API: {
          // sidebarPath: require.resolve('./sidebars.js'),
          // // Please change this to your repo.
          // editUrl:
            // 'https://github.com/allegroai/clearml-docs/edit/main/',
        // },
        blog: {
          blogTitle: 'ClearML Tutorials',
          blogDescription: 'ClearML tutorials and documentation',
          path: 'tutorials',
          routeBasePath: 'tutorials',
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/allegroai/clearml-docs/edit/main/tutorials/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'none',
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
      },
    ],
  ],
  themes: [
      [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
          hashed: true,
          // whether to index docs pages
          indexDocs: true,
          // must start with "/" and correspond to the routeBasePath configured for the docs plugin
          // use "/" if you use docs-only-mode
          // (see https://v2.docusaurus.io/docs/2.0.0-alpha.70/docs-introduction#docs-only-mode)
          docsRouteBasePath: '/docs',
          searchResultLimits: 8,
          searchResultContextMaxLength: 50,

          // whether to index blog pages
          indexBlog: false,
          // blogRouteBasePath: '/blog',

          // files to ignore in search
          // whether to index static pages
          // /404.html is never indexed
          indexPages: false,
          ignoreFiles: [/docs\/release_notes\/.*/],

          // language of your documentation, see next section
          language: "en",
    }]],
  plugins: [
    // ... Your other plugins.
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'none', // GTM Container ID
      }
    ],
    path.resolve(__dirname, 'src/zoom-plugin')
  ],
};
