// imports
importScripts('//cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js')

const CACHE_VERSION = 1;

const STATIC_CACHE = 'cache-static-v'+CACHE_VERSION;
const DYNA_CACHE = 'cache-dyna-v'+CACHE_VERSION;
const INMU_CACHE = 'cache-inmut-v'+CACHE_VERSION;


const APP_FILES = {
    '/',

    './assets/css/breeds.css',
    './assets/css/normalize.css',
    './assets/css/style.css',
    './assets/css/swiper.min.css',

    './assets/fonts/breeds/UrbanPet.eot',
    './assets/fonts/breeds/UrbanPet.svg',
    './assets/fonts/breeds/UrbanPet.ttf',
    './assets/fonts/breeds/UrbanPet.woff',

    './assets/fonts/icomoon/icomoon.eot',
    './assets/fonts/icomoon/icomoon.svg',
    './assets/fonts/icomoon/icomoon.ttf',
    './assets/fonts/icomoon/icomoon.woff',

    './assets/img/bad.svg',
    './assets/img/bg-green.jpg',
    './assets/img/bg-green.png',
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
    './data/pwa.json',

    './index.html',
    './manifest.json',
    './scandir.php',
    './sw.js'

}

self.addEventListener('install', e => {

    /** Creating Cache **/
     const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

   /* const cacheInmutable = caches.open( INMU_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));*/



    e.waitUntil( Promise.all([ cacheStatic ])  );
 
});


self.addEventListener('fetch', e => {
     console.info('fetch: ',window.onLine);
});

self.addEventListener('activate', e => {
  console.info('ACTIVATE: ',window.onLine);
});


self.addEventListener('sync' , e => {
	console.info('SYNC: ',window.onLine);
});