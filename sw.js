const CACHE_NAME = 'Pebbles Pro v1';
const ASSETS = [
  'sw.js', // Add this line
  '/',
  'index.html',
  'quiz.html',
  'analytics.html',
  'results.html',
  'css/style.css',
  'css/quiz.css',
  'css/analytics.css',
  'css/print.css',
  'css/results.css',
  'js/app.js',
  'js/quiz.js',
  'js/analytics.js',
  'js/results.js',
  'js/questions.js',
  'images/icon.jpg',
  'images/icon192.jpg',
  'images/icon32.jpg',
  'images/icon512.jpg',
  'images/logo.png',
  'images/about.jpg',
  'images/Pebbles.gif',
  'images/pebbles-1.jpg',
  'images/pebbles-2.jpg',
  'images/pebbles-3.jpg',
  'images/pebbles-4.jpg',

  // Add other important images/assets you want cached
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS)))
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});