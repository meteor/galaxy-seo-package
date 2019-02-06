var prerender = exports.PrerenderIO = require('prerender-node');
var token;
var serviceUrl;
var protocol;
var settings = Meteor.settings.PrerenderIO;


token = process.env.PRERENDERIO_TOKEN || (settings && settings.token);
protocol = process.env.PRERENDERIO_PROTOCOL || (settings && settings.protocol);

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
serviceUrl = settings && (settings.prerenderServiceUrl || settings.serviceUrl);
serviceUrl = process.env.PRERENDERIO_SERVICE_URL || serviceUrl;


if (token) {
  if (serviceUrl) prerender.set('prerenderServiceUrl', serviceUrl);
  prerender.set('prerenderToken', token);
  if (protocol) prerender.set('protocol', protocol);

  prerender.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
      return;
    }
  });

  WebApp.rawConnectHandlers.use(prerender);
}
