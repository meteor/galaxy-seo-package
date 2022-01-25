/* global Package Npm */

Package.describe({
  name: 'mdg:seo',
  summary: 'Provide SEO support for enabled apps.',
  version: '3.3.0',
  git: 'https://github.com/meteor/galaxy-seo-package',
});

Npm.depends({
  'prerender-node': '3.4.1',
});

Package.onUse(function packageConfiguration(api) {
  api.versionsFrom('2.5.3');
  api.use('ecmascript');

  api.use(['modules','webapp'], 'server');

  api.export(['PrerenderIO'], 'server');

  api.mainModule('server/prerender.js', 'server');
});
