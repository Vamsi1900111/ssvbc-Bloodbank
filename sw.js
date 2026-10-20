var C="bloodcenter-v16",F=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return res}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match("./index.html")})}));
});
