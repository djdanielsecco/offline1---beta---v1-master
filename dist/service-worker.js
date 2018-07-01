/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

importScripts(
  "/precache-manifest.c5a26a78b580c0a84e7f896ee13523bb.js"
);
importScripts('./src/js/idb.js');
importScripts('./src/js/utility.js');
importScripts('./src/js/fetch.js');

workbox.setConfig({ debug: true });
workbox.core.setCacheNameDetails({prefix: "offline1"});
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});



self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background syncing', event);
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new Posts');
    event.waitUntil(
      readAllData('sync-posts')
        .then(function(data) {
          var i = -1;
          for (var dt of data) {
              
               var synData = {
                     id: dt.id,
                     image: dt.image,
                     tag_num: dt.tag_num,
                     geolocation: dt.geolocation,
                     cod_Tree: dt.cod_Tree,
                     data: dt.data,
                     hora: dt.hora,
                     user: dt.user
               };
             
             
             console.log(synData);
           
            fetch('https://ativador-55a4a.firebaseio.com/posts.json' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
        mode: 'cors',
              body:JSON.stringify(dt)
            })
              .then(function(res) {
                console.log('Sent data', res);
                
                if (res.ok) {
                  res.json()
                    .then(function(resData) {
                     
                      i++;
                      console.log(dt, '  ---> ', data[i].id);
                      deleteItemFromData('sync-posts', data[i].id);
                    });
                }
              })
              .catch(function(err) {
                console.log('Error while sending data', err);
              });
          }

        })
    );
  }
});


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'img/icons/apple-touch-icon.png',
    badge: 'img/icons/apple-touch-icon.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});