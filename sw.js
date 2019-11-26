// imports
 


const CACHE_VERSION = 1.02;

const STATIC_CACHE = 'cache-static-v' + CACHE_VERSION;
const DYNA_CACHE = 'cache-dyna-v' + CACHE_VERSION;
const INMU_CACHE = 'cache-inmut-v' + CACHE_VERSION;


const APP_FILES = [
	 
	 './',
	 './index.html',
    './manifest.json',
    './sw.js',
    './assets/css/breeds.css',
    './assets/css/normalize.css',
    './assets/css/style.css',
    './assets/css/swiper.min.css',

    './assets/fonts/breeds/UrbanPet.eot?jpc6s0',
    './assets/fonts/breeds/UrbanPet.svg?jpc6s0',
    './assets/fonts/breeds/UrbanPet.ttf?jpc6s0',
    './assets/fonts/breeds/UrbanPet.woff?jpc6s0',

    './assets/fonts/icomoon/icomoon.eot?4hxjrq',
    './assets/fonts/icomoon/icomoon.svg?4hxjrq',
    './assets/fonts/icomoon/icomoon.ttf?4hxjrq',
    './assets/fonts/icomoon/icomoon.woff?4hxjrq',

    './assets/img/bad.svg',
    './assets/img/bg-green.jpg',
    './assets/img/icons/icon-128x128.png',
    './assets/img/icons/icon-144x144.png',
    './assets/img/icons/icon-152x152.png',
    './assets/img/icons/icon-192x192.png',
    './assets/img/icons/icon-384x384.png',
    './assets/img/icons/icon-512x512.png',
    './assets/img/icons/icon-72x72.png',
    './assets/img/icons/icon-96x96.png',

    './assets/img/logo.svg',
    './assets/img/regular.svg',
    './assets/img/smile.svg',
    './assets/img/urbanpet-animal.svg',
    './assets/img/urbapetapp-logo.png',
    './assets/img/urbapetapp-logo.svg',

    './assets/js/app.js',
    './assets/js/jquery.min.js',
    './assets/js/reviews.js',
    './assets/js/swiper.min.js',

    './data/breedSizes.json',
    './data/prods.json',
    './data/pwa.json'

//'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=PBFhLu' 
     
];

const APP_INMU = [
 
    'https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap',
   'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/prisma-2_h_harness_01575ee8-f1a4-459f-9c67-c89d384100bf.png?v=1562785897',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/prisma-2_collar.png?v=1562785795',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/milky_collar_2_c9fcd0c9-0269-4f37-a8fd-53828128345b.png?v=1562783535',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/florida-2_collar.png?v=1562783249',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/ella_2_h_harness_7ea175e2-7aa7-48e8-96c4-857c01c4ef9c.png?v=1562782846',
   'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/atlanta-2_collar_1.png?v=1563504854',
  'https://cdn.shopify.com/s/files/1/0081/6096/8759/products/Collar_Green_1.png?v=1562774798'

];

self.addEventListener('install', e => {

    /** Creating Cache **/
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
            return cache.addAll(APP_FILES)
        });

    const cacheInmu = caches.open(INMU_CACHE).then(cache => {
            return cache.addAll(APP_INMU)
        }
    );
 

    e.waitUntil(Promise.all([cacheStatic, cacheInmu]));

});

self.addEventListener('fetch', e => {

    const response = caches.match(e.request).then(res => {

        if (res) {
            return res;
        }

        // If some files don't exit in the cache then add them
        console.log('No existe', e.request.url)

        var corsRequest = new Request(e.request.url, {mode: 'cors'});
 
           return fetch(corsRequest).then(newResp => {
                caches.open(DYNA_CACHE).then(cache =>
                    cache.put(e.request, newResp)
                );
                return newResp;
            }) ;
    }); // end response

    e.respondWith(response);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('sync', e => {
    //console.info('SYNC: ',navigator.onLine);
});