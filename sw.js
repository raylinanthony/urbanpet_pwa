// imports



const CACHE_VERSION = 1.01;

const STATIC_CACHE = 'cache-static-v' + CACHE_VERSION;
const DYNA_CACHE = 'cache-dyna-v' + CACHE_VERSION;
const INMU_CACHE = 'cache-inmut-v' + CACHE_VERSION;
const arrCaches = [STATIC_CACHE, DYNA_CACHE, INMU_CACHE];
const prodsShopify = 'https://urbanpet.do/products.json?limit=999';

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
    './data/pwa.json'
];

const APP_INMU = [

    'https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap',
    prodsShopify

];

self.addEventListener('install', e => {

    let _gettingData = fetch('https://urbanpet.do/products.json?limit=999').then(data => {

        return data.json();

    }).then(res => {

        res.products.map((val, key) => {

            if (val.images.length > 0) {

                val.images.map(img => {

                    APP_INMU.push(img.src);

                });

            }

        })

        /** Creating Cache **/
        const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
            return cache.addAll(APP_FILES)
        });

        const cacheInmu = caches.open(INMU_CACHE).then(cache => {
            return cache.addAll(APP_INMU)
        });

        e.waitUntil(Promise.all([cacheStatic, cacheInmu]));
    })


    e.waitUntil(Promise.all([_gettingData]));

});

self.addEventListener('fetch', e => {

    const response = caches.match(e.request).then(res => {

        if (res) {
            return res;
        }

        // If some files don't exit in the cache then add them


        var corsRequest = new Request(e.request.url, {
            mode: 'cors'
        });

        return fetch(corsRequest).then(newResp => {
        
            caches.open(DYNA_CACHE).then(cache =>
                cache.put(e.request, newResp.clone())
            );
        
            return newResp;
        
        });

    }); // end response

    e.respondWith(response);
});

self.addEventListener('activate', e => {

    const cacheDel =  caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log(cacheName, arrCaches.indexOf(cacheName))
                    if (arrCaches.indexOf(cacheName) === -1 ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        });

    e.waitUntil(cacheDel);

});


self.addEventListener('sync', e => {
    //console.info('SYNC: ',navigator.onLine);
});