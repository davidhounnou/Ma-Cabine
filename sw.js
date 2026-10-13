const V="ma-cabine-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","xlsx.full.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 const keep=x=>{const cp=x.clone();caches.open(V).then(c=>c.put(r,cp));return x};
 if(/xlsx|icon-/.test(r.url))e.respondWith(caches.match(r).then(h=>h||fetch(r).then(keep)));
 else e.respondWith(fetch(r).then(keep).catch(()=>caches.match(r).then(h=>h||caches.match("index.html"))))});
