
// Files to cache
var cacheName = 'subwaytimes-v1';
var appShellFiles = [
  '/pwa-examples/src/',
  '/pwa-examples/public/index.html',
  '/pwa-examples/src/app.js',
  '/pwa-examples/src/index.css',
  '/pwa-examples/public/favicon.ico',
  '/pwa-examples/public/icons/icon-32.png',
  '/pwa-examples/public/icons/icon-192.png',
  '/pwa-examples/public/icons/icon-512.png'
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
