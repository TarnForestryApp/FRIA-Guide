// Offline cache for the FRIA Field Guide. Version changes whenever the guide or app changes.
const CACHE='fria-fcf7d2dd14';
const FILES=["./", "index.html", "manifest.webmanifest", "img/icon-180.png", "img/icon-192.png", "img/icon-512.png", "img/image10.png", "img/image11.png", "img/image12.png", "img/image13.png", "img/image14.png", "img/image15.png", "img/image16.png", "img/image17.png", "img/image18.png", "img/image3.png", "img/image4.png", "img/image5.png", "img/image6.png", "img/image7.png", "img/image8.png", "img/image9.png", "img/logo.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match('index.html'))));
});
