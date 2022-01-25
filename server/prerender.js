import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

const prerenderio = exports.PrerenderIO = require('prerender-node');

const settings = Meteor.settings.PrerenderIO;

const token = process.env.PRERENDERIO_TOKEN || (settings && settings.token);
const protocol = process.env.PRERENDERIO_PROTOCOL || (settings && settings.protocol);

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
const serviceUrlFromSettings = settings && (settings.prerenderServiceUrl || settings.serviceUrl);
const serviceUrl = process.env.PRERENDERIO_SERVICE_URL || serviceUrlFromSettings;


if (token) {
  if (serviceUrl) {
    prerenderio.set('prerenderServiceUrl', serviceUrl);
  }

  prerenderio.set('prerenderToken', token);

  if (protocol) {
    prerenderio.set('protocol', protocol);
  }

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
    }
  });

  WebApp.rawConnectHandlers.use(prerenderio);
}
