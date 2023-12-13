const CACHE_NAME = "APP_CACHE"
const CACHE_ASSETS = [
    "/",
    "./script.js",
    "./style.css",
]

self.addEventListener("install", (e) => {
    console.log(`Service Worker: Installed`)
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(`Service Worker: Caching Files`)
            return cache.addAll(CACHE_ASSETS)
        })
        .then(()=>{
            self.skipWaiting()
        })
    )
})

self.addEventListener("activate",(e)=>{
    e.waitUntil(
     caches.keys().then(cacheNames =>{
         return Promise.all(
             cacheNames.map(cache =>{
                 if(cache !== CACHE_NAME){
                     console.log("Service Worker: Clearing old Cache")
                     return caches.delete(cache)
                 }
             })
         )
     })
    )
})

self.addEventListener("fetch", (e) => {
    console.log(`Service Worker: Fetching`)
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request)
        })
    )
})