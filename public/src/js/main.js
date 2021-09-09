
var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Registered Service Worker!');
    });
}

button.addEventListener('click', function(event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }
});

let url ='https://httpbin.org/ip';
let networkResponse = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkResponse = true;
    console.log(data.origin);
    box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  });

if ('caches' in window) {
  caches.match(url).then( (response) => {
    if (response){
      response.json();
    }
  }).then( (data) => {
    if (!networkResponse) {
      box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
    }
  })
}