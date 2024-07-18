# CHANGELOG

## 3.5.2 (2024-07-18)
- Now rely on the official Meteor 3 

## 3.5.1 (2023-12-06)
- Add support to Meteor v3.0.0

## 3.5.0 (2023-06-09)
- Update prerender-node to 3.7.0
- Add support for new Google user agent tokens: "Google-InspectionTool" and "Googlebot"
  - Full user agent strings:
    - Mobile: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Google-InspectionTool/1.0)"
    - Desktop: "Mozilla/5.0 (compatible; Google-InspectionTool/1.0)"

## 3.4.0 (2022-08-10)
- Update prerender-node to 3.5.0
- Add support for missing prerender-node options: forwardHeaders, prerenderServerRequestOptions, whitelist and blocklist

## 3.3.0 (2022-01-25)
- Update prerender-node to 3.4.1
- Modernize code

## v3.2.2 (2019-12-17)
- Removes `<head><meta name="fragment" content="!"></head>` tag because it is not [needed anymore](https://developers.google.com/search/docs/ajax-crawling/docs/getting-started)
-Updates `prerender-node` from 3.2.1 to 3.2.5
