/**
 * Anti-Bullying Runner v2.0 ULTRA — script.js
 *
 * Este arquivo é reservado para extensões futuras (analytics, PWA, etc.).
 * Todo o motor do jogo está em game.js, carregado com defer no index.html.
 *
 * Não deve carregar game.js dinamicamente (causaria duplo carregamento),
 * nem sobrescrever activatePower/handleCollision (já implementados no motor).
 */

(function () {
  'use strict';

  /* PWA — manifest embutido */
  (function injectManifest() {
    const manifest = {
      name: 'ANTI-BULLYING RUNNER v2.0 ULTRA',
      short_name: 'AB RUNNER',
      description: 'Corra. Decida. Faça a diferença.',
      start_url: './',
      display: 'standalone',
      background_color: '#0d0221',
      theme_color: '#6f47ff',
      orientation: 'portrait',
      icons: []
    };
    try {
      const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = URL.createObjectURL(blob);
      document.head.appendChild(link);
    } catch (e) { /* manifest opcional — ignora em ambientes restritos */ }
  })();

  /* Service Worker embutido (cache básico para PWA offline) */
  (function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    const swCode = `
      const CACHE = 'abrunner-v2';
      self.addEventListener('install', e => {
        e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./'])));
      });
      self.addEventListener('fetch', e => {
        e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
      });
    `;
    try {
      const blob = new Blob([swCode], { type: 'text/javascript' });
      const swUrl = URL.createObjectURL(blob);
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(swUrl).catch(function () {});
      });
    } catch (e) { /* SW opcional */ }
  })();

  /* Botão "Instalar como app" */
  (function setupInstallBtn() {
    let deferred = null;
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferred = e;
      const btn = document.getElementById('btn-install');
      if (btn) btn.style.display = 'block';
    });
    const installBtn = document.getElementById('btn-install');
    if (installBtn) {
      installBtn.addEventListener('click', async function () {
        if (!deferred) return;
        deferred.prompt();
        await deferred.userChoice;
        deferred = null;
      });
    }
  })();

})();
