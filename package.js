Package.describe({
  name: 'mdg:seo',
  summary: 'Provide SEO support for enabled apps.',
  version: '3.2.3',
  git: 'https://github.com/meteor/galaxy-seo-package',
});

Npm.depends({
  'prerender-node': '3.4.1',
});

Package.onUse(function packageConfiguration(api) {
  api.use(['modules','webapp'], 'server');
  api.export(['PrerenderIO'], 'server');
  api.versionsFrom('1.4');  // prerender-node requires Node 4
  api.mainModule('server/prerender.js', 'server');
});
