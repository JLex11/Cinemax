const cache_name = 'serviceWorkerCache';
const urlToCache = [
    './',
    './*',
    './View/cinemaxAdmin.html',
    './Js/Admin/main.js',
    './Css/Admin/estilos.css',
    './Images/Home.webp',
    './Images/folder.webp',
    './Images/logout.webp',
    './Images/setting-favicon.webp',
    './Images/user.webp',
    './pwa/icon-192x192.webp',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.js',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(urlToCache);
            })
            .then(() => {
                self.skipWaiting();
            })
            .catch(err => console.log('Fallo registro de cache', err))
    );
});

//cuando no halla internet busca los recursos para cargalos offline
self.addEventListener('activate', e => {
    const cacheWhiteList = [cache_name];

    e.waitUntil(
        caches
            .keys()
            .then(caches => {
                caches.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) == -1) {
                        return caches.delete(cacheName);
                    }
                });
            })
            .then(() => self.clients.claim())
    );
});

//se usa para cargar mas rapido los recursos y actualizarlos en cache
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if (res) return res;

            return fetch(e.request);
        })
    );
});
