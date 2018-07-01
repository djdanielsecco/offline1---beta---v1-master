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
  "/precache-manifest.92d2c3eb21afef3a7d105761aee62063.js"
);

importScripts('./src/js/idb.js');
importScripts('./src/js/utility.js');
importScripts('./src/js/fetch.js');

workbox.setConfig({ debug: true });
//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-resources',
	  plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404],
        headers: {
         
              'Cache-Control': 'max-age=360000'
        },
      })
    ]
  }),
);
workbox.routing.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', workbox.strategies.staleWhileRevalidate({
  cacheName: 'material-css',
      plugins: [
      new workbox.expiration.Plugin({
         //statuses: [200, 404],
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 10,
      }),
    ]
}));

workbox.core.setCacheNameDetails({prefix: "offline1"});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
      plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404],
        headers: {
         
              'Cache-Control': 'max-age=360000'
        },
      })
    ]});

workbox.routing.registerRoute(function (routeData) {
  return (routeData.event.request.headers.get('accept').includes('text/html'));
}, function(args) {
  return caches.match(args.event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(args.event.request)
          .then(function (res) {
            return caches.open('statics')
              .then(function (cache) {
   new Request('/service.worker.js', { cache: 'max-age=360000' }),
                cache.put(args.event.request.url, res.clone());
                return res;
              })
          })
          .catch(function (err) {
            return caches.match('/offline.html')
              .then(function (res) {
                return res;
              });
          });
      }
    })
});



/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */



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



////////////////////////////

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
  "/precache-manifest.16c0a68554c828102dfd9bd1be10cf76.js"
);

importScripts('./src/js/idb.js');
importScripts('./src/js/utility.js');
importScripts('./src/js/fetch.js');

workbox.setConfig({ debug: true });
//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
/*workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-resources',
	  plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404],
        headers: {
         
              'Cache-Control': 'max-age=360000'
        },
      })
    ]
  }),
);*/
/*workbox.routing.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', workbox.strategies.staleWhileRevalidate({
  cacheName: 'material-css',
      plugins: [
      new workbox.expiration.Plugin({
         //statuses: [200, 404],
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 10,
      }),
    ]
}));*/

workbox.routing.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', workbox.strategies.staleWhileRevalidate({
  cacheName: 'material-css',
      plugins: [
      new workbox.expiration.Plugin({
         //statuses: [200, 404],
        // Only cache requests for a week
        maxAgeSeconds: 36000,
        // Only cache 10 requests.
        maxEntries: 10,
      }),
    ]
}));
/*workbox.routing.registerRoute('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js', workbox.strategies.staleWhileRevalidate({
  cacheName: 'workbox',
      plugins: [
      new workbox.expiration.Plugin({
         //statuses: [200, 404],
        // Only cache requests for a week
        maxAgeSeconds: 36000,
        // Only cache 10 requests.
      maxEntries: 20,
      }),
    ]
}));*/

workbox.core.setCacheNameDetails({prefix: "offline1"});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(function (routeData) {
  return (routeData.event.request.headers.get('accept').includes('text/html'));
}, function(args) {
  return caches.match(args.event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(args.event.request)
          .then(function (res) {
            return caches.open('static-resources')
              .then(function (cache) {
  
                cache.put(args.event.request.url, res.clone());
                return res;
              })
          })
          .catch(function (err) {
            return caches.match('/offline.html')
              .then(function (res) {
                return res;
              });
          });
      }
    })
});



/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */



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