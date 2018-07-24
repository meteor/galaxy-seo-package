Galaxy SEO Support
===

Makes use of the built-in SEO support in Galaxy. If your app qualifies for SEO support, run:

`meteor add mdg:seo`

to turn on the built-in Prerender.io integration.  You may also use this package with non-Galaxy deployments if you configure it manually.

This package is a thin wrapper around the [`prerender-node`](https://www.npmjs.com/package/prerender-node) npm module, which understands the configuration format used by Galaxy to provide apps with a complimentary Prerender.io account.  If you're not deploying to Galaxy, you may want to just use the npm module directly.

This package is based on a package previously released by Dominik Ferber as [dferber:prerender](https://github.com/dferber90/meteor-prerender/) (and older versions of this package simply depended on that package).

## Manual configuration (non-Galaxy users)

In your settings.json file, include:

```
{
  "PrerenderIO": {
    "serviceUrl": "http://localhost:3033/",
    "token": "yourtoken"
  }
}
```

The `serviceURL` is optional and only used to test the Prerender server locally.
Leave it out in your production configuration.

*NOTICE*: You may also provide the above credentials using environment variables, namely `PRERENDERIO_TOKEN` and `PRERENDERIO_SERVICE_URL`. They precede the configuration from the settings file.

## Testing and Verifying
There are two options to test whether Prerender is working or not.

### Locally (recommended)

1. Set the `serviceUrl` to `http://localhost:3033/`.
2. Download the [open source Prerender server](https://prerender.io/documentation/test-it) to another directory
3. Run the Prerender server with a custom port locally (because 3000 is taken by your Meteor app), with `$ PORT=3033 node server.js`
4. Visit any URL of your application and append `?_escaped_fragment_=`, e.g. [http://localhost:3000/?_escaped_fragment_=](http://localhost:3000/?_escaped_fragment_=) (perhaps using curl instead of a browser)

This will show you the version Prerender generated and search engines will see.
You can view logs in the running prerender server which is quite helpful.


### Using the Prerender service

1. Set the `serviceUrl` to `http://service.prerender.io/`.
2. Visit any URL of your application and append `?_escaped_fragment_=`, e.g. [http://localhost:3000/?_escaped_fragment_=](http://localhost:3000/?_escaped_fragment_=)
3. See what is reported to Prerender at [https://prerender.io/][prerender-io],

For more options, take a look at the [prerender-node package][prerender-node].


## Delaying the rendering

Sometimes the content will not show up immediately and all Prerender sees are loading spinners.
This happens because Prerender uses the HTML too early, while the subscriptions are still loading.

Set `window.prerenderReady = false;` in the client side code. This will tell Prerender to wait.
When your content is loaded, set it to `true` and Prerender will use that version.
It's also possible to never set it to `true`.
The request will then time out after about 20 seconds and Prerender will use whatever is on the screen.

## Possible Errors

```
Error: connect ECONNREFUSED
    at errnoException (net.js:905:11)
    at Object.afterConnect [as oncomplete] (net.js:896:19)
```
If you get this error, you probably forgot to run your local Prerender server.

## Contributions

Thanks to [@dferber90](https://github.com/dferber90) for the [dferber:prerender] package which this is based on.
Thanks to [@electricjesus](https://github.com/electricjesus) and [@dfischer][dfischer] for a [previous version](https://github.com/dfischer/meteor-prerenderio).
Thanks to [@arunoda](https://github.com/arunoda) for simplifying [prerender-node][prerender-node].

[prerender-node]: https://github.com/prerender/prerender-node
[prerender-io]: https://prerender.io/
[dfischer]: https://github.com/dfischer

