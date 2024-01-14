/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-728a0c38'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  }, {
    "url": "assets/avatar1-9iIW41dL.png",
    "revision": null
  }, {
    "url": "assets/avatar2-aXyhGwu1.png",
    "revision": null
  }, {
    "url": "assets/avatar3-2KBwp-cj.png",
    "revision": null
  }, {
    "url": "assets/avatar4-hSDJoAf2.png",
    "revision": null
  }, {
    "url": "assets/avatar5-4dnqbg39.png",
    "revision": null
  }, {
    "url": "assets/default-bJGktMBg.png",
    "revision": null
  }, {
    "url": "assets/HouseM8s-black-dLP18ctG.png",
    "revision": null
  }, {
    "url": "assets/HouseM8s-icon-black-ckWXqddW.png",
    "revision": null
  }, {
    "url": "assets/HouseM8s-icon-white-KGB3KB_a.png",
    "revision": null
  }, {
    "url": "assets/HouseM8s-icon-Xb799GeW.png",
    "revision": null
  }, {
    "url": "assets/HouseM8s-white-0ob_Xm8z.png",
    "revision": null
  }, {
    "url": "assets/index-bpd6ujzS.js",
    "revision": null
  }, {
    "url": "assets/index-g_GcbEej.css",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-prqDwDSL.js",
    "revision": null
  }, {
    "url": "icons/HouseM8s-icon-black-192x192.png",
    "revision": "847d22a6def5a05203b187b882a5d9c8"
  }, {
    "url": "icons/HouseM8s-icon-black-512x512.png",
    "revision": "6e93c610e66d9b92ca09e2840af84c09"
  }, {
    "url": "icons/HouseM8s-icon-white-192x192.png",
    "revision": "b7bc2b421b80172500fc42140813149a"
  }, {
    "url": "icons/HouseM8s-icon-white-512x512.png",
    "revision": "270ec0a8430a68202a8243e37027f3da"
  }, {
    "url": "icons/HouseM8s-icon.png",
    "revision": "42d9fb4652ec56b9a27c4353dc72cd63"
  }, {
    "url": "index.html",
    "revision": "eb291b62ad29be29aba3776125c68e2c"
  }, {
    "url": "screenshots/desktop.png",
    "revision": "436e33a084594aab44d15bb13e60caea"
  }, {
    "url": "screenshots/mobile.png",
    "revision": "e7e515692ded2b7d34cc9eb2d1ea2f00"
  }, {
    "url": "vite.svg",
    "revision": "8e3a10e157f75ada21ab742c022d5430"
  }, {
    "url": "icons/HouseM8s-icon-white-192x192.png",
    "revision": "b7bc2b421b80172500fc42140813149a"
  }, {
    "url": "icons/HouseM8s-icon.png",
    "revision": "42d9fb4652ec56b9a27c4353dc72cd63"
  }, {
    "url": "icons/HouseM8s-icon-white-512x512.png",
    "revision": "270ec0a8430a68202a8243e37027f3da"
  }, {
    "url": "manifest.webmanifest",
    "revision": "fec1d67f0ac7cf6b3c260c353edb410a"
  }], {});
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
