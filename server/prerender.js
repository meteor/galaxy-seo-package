import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

const prerenderio = exports.PrerenderIO = require('prerender-node');

const settings = Meteor.settings.PrerenderIO;

const token = process.env.PRERENDERIO_TOKEN || (settings && settings.token);
const protocol = process.env.PRERENDERIO_PROTOCOL || (settings && settings.protocol);
const forwardHeaders = process.env.PRERENDERIO_FORWARD_HEADERS
  ? process.env.PRERENDERIO_FORWARD_HEADERS.toLowerCase() === 'true'
  : (settings && settings.forwardHeaders);
const serverRequestOptions = process.env.PRERENDERIO_SERVER_REQUEST_OPTIONS
  ? JSON.parse(process.env.PRERENDERIO_SERVER_REQUEST_OPTIONS)
  : (settings && settings.serverRequestOptions);

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
const serviceUrlFromSettings = settings && (settings.prerenderServiceUrl || settings.serviceUrl);
const serviceUrl = process.env.PRERENDERIO_SERVICE_URL || serviceUrlFromSettings;

// Block and allow list support
const allowList = process.env.PRERENDERIO_ALLOW_LIST
? JSON.parse(process.env.PRERENDERIO_ALLOW_LIST)
: (settings && settings.allowList);
const blockList = process.env.PRERENDERIO_BLOCK_LIST
  ? JSON.parse(process.env.PRERENDERIO_BLOCK_LIST)
  : (settings && settings.blockList);


if (token) {
  if (serviceUrl) {
    prerenderio.set('prerenderServiceUrl', serviceUrl);
  }

  prerenderio.set('prerenderToken', token);

  if (protocol) {
    prerenderio.set('protocol', protocol);
  }

  prerenderio.set('forwardHeaders', forwardHeaders);

  if (serverRequestOptions) {
    prerenderio.set('prerenderServerRequestOptions', serverRequestOptions);
  }

  if (Array.isArray(allowList) && allowList.length > 0) {
    prerenderio.whitelisted(allowList);
  }

  if (Array.isArray(blockList) && blockList.length > 0) {
    prerenderio.blacklisted(blockList);
  }

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
    }
  });

  WebApp.rawConnectHandlers.use(prerenderio);
}
