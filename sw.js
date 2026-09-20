/* Service worker do Treinos.
   Objetivo: abrir sem sinal nenhum, que e a situacao normal dentro da academia.

   Estrategia por tipo de pedido:
   - navegacao (o proprio app): rede primeiro, cache como rede de seguranca. Assim
     um push novo aparece na proxima abertura com sinal, em vez de ficar preso numa
     versao antiga para sempre.
   - demais arquivos do proprio site: cache primeiro, porque sao estaticos, com
     atualizacao em segundo plano.
   - outros dominios: passa direto, sem tocar. */

const VERSAO = "treinos-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./vendor/bootstrap.min.css",
  "./vendor/bootstrap.bundle.min.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", ev => {
  ev.waitUntil(
    caches.open(VERSAO)
      // addAll falha inteiro se um arquivo faltar; individual e mais tolerante
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", ev => {
  ev.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // instagram, youtube: nao e nosso

  if (req.mode === "navigate") {
    ev.respondWith(
      fetch(req)
        .then(res => {
          const copia = res.clone();
          caches.open(VERSAO).then(c => c.put("./index.html", copia));
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(cacheado => {
      const daRede = fetch(req).then(res => {
        if (res && res.ok) {
          const copia = res.clone();
          caches.open(VERSAO).then(c => c.put(req, copia));
        }
        return res;
      }).catch(() => cacheado);
      return cacheado || daRede;
    })
  );
});
