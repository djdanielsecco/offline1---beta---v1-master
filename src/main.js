import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
    store
} from './store/store'
import * as config from './assets/js/config.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueMDCAdapter from 'vue-mdc-adapter';
import Vuex from 'vuex'
import VueFire from 'vuefire'
import 'swiper/dist/css/swiper.css'
import './registerServiceWorker'
require('../public/src/js/promise.js')
require('../public/src/js/fetch.js')
//require('../public/src/js/idb.js')
require('../public/src/js/material.min.js')
require('../public/src/js/utility.js')
Vue.use(VueFire)
Vue.use(Vuex)
Vue.use(VueMDCAdapter)
Vue.use(VueAwesomeSwiper, /* { default global options } */ )
Vue.config.productionTip = false
// set firebase/firestore
var $ = require('jquery')
var defaultApp = firebase.initializeApp(config.configFirebase);
export const firestore = firebase.firestore()
import './assets/js/pushnoty.js'
firestore.settings({
    timestampsInSnapshots: true
});
firestore.enablePersistence().then(function () {
        console.log('persistence ok')
    })
    .catch(function (err) {
        store.dispatch('setErro', err)
    });
//////////////// promise
var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('This is executed once the timer is done!');
        reject({
            code: 500,
            message: 'An error occurred!'
        });
        //console.log('This is executed once the timer is done!');
    }, 100);
});
if (!window.Promise) {
    window.Promise = promise;
};
///////////////////////interface
function updateUI(data) {
    for (var i = 0; i < data.length; i++) {
        writeData('trees', data[i]);
        //console.log(data);
    }
};
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
});
function updateUI2(data) {
    for (var i = 0; i < data.length; i++) {
        delete data[i].image;
        writeData('posts', data[i]);
    }
};
// header fetch(url,{myInit})
var myInit = {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*/*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    mode: 'cors'
};
//////
export const eventHub = new Vue();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
promise.then(function (text) {
    return text;
}).then(function (newText) {
    console.log(newText);
}).catch(function (err) {
    console.log(err.code, err.message);
});
import './assets/js/estimate.js'
////// push

export function resyncpost () {
    
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
}