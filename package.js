Package.describe({
  name: 'mdg:seo',
  summary: 'Provide SEO support for enabled apps.',
  version: '2.2.2_3',
  git: 'https://github.com/meteor/galaxy-seo-package',
});

Npm.depends({
  'prerender-node': '2.2.2',
});

Package.onUse(function packageConfiguration(api) {
  api.use(['templating'], 'client');
  api.use(['webapp'], 'server');
  api.versionsFrom('1.4');  // prerender-node requires Node 4
  api.addFiles('server/prerender.js', 'server');
  api.addFiles('client/prerender.html', 'client');
});
