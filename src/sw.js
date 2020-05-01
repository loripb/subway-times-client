
// Files to cache
var cacheName = 'subwaytimes-v1';
var appShellFiles = [
  '/subway-times-client/src/',
  '/subway-times-client/public/index.html',
  '/subway-times-client/src/app.js',
  '/subway-times-client/src/Redux/actions.js',
  '/subway-times-client/src/Redux/directionReducer.js',
  '/subway-times-client/src/Redux/lineReducer.js',
  '/subway-times-client/src/Redux/stopReducer.js',
  '/subway-times-client/src/Redux/userReducer.js',
  '/subway-times-client/src/index.js',
  '/subway-times-client/src/index.css',
  '/subway-times-client/public/favicon.ico',
  '/subway-times-client/public/icons/icon-32.png',
  '/subway-times-client/public/icons/icon-192.png',
  '/subway-times-client/public/icons/icon-512.png'
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(appShellFiles);
      })
    );
});

// fetching Lines
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetched resource '+e.request.url);
});
