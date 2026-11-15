/* ============================================================
   Popup "Tres cuentos de Tailandia" - Tailandia en tus manos
   ------------------------------------------------------------
   INSTALACIÓN (sitio SvelteKit estático):
   1. Subir este archivo como  static/popup-cuentos.js
      (queda servido en  /popup-cuentos.js )
   2. En  src/app.html , dentro del <body> (o al final del <head>),
      agregar UNA sola línea:
          <script defer src="/popup-cuentos.js"></script>
   3. Las imágenes ya viven en  /regalo/assets/  (carpeta regalo/
      dentro de static/). Si se mueven, ajustar la constante ASSETS.
   Comportamiento: aparece 5 s después de cargar la home (solo path "/";
   para sumar la home en inglés agregar '/en/' en PATHS). Se cierra con
   la cruz, con Escape o clickeando afuera, y no vuelve a aparecer por
   7 días (localStorage).
   ============================================================ */
(function () {
  'use strict';

  var ASSETS = '/regalo/assets/';
  var PATHS = ['/'];              // agregar '/en/' si se quiere también en inglés
  var DELAY_MS = 5000;
  var SUPPRESS_DAYS = 7;
  var LS_KEY = 'tth_popup_cuentos_closed';

  if (PATHS.indexOf(location.pathname.replace(/\/+$/, '') || '/') === -1 &&
      PATHS.indexOf(location.pathname) === -1) return;

  try {
    var closed = localStorage.getItem(LS_KEY);
    if (closed && (Date.now() - Number(closed)) < SUPPRESS_DAYS * 864e5) return;
  } catch (e) { /* sin localStorage: mostrar igual */ }

  function boot() { setTimeout(show, DELAY_MS); }
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);

  function show() {
    if (document.getElementById('tth-popup-overlay')) return;

    var css = document.createElement('style');
    css.textContent = [
      '#tth-popup-overlay{position:fixed;inset:0;z-index:99999;background:rgba(61,18,27,.72);',
      'backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;',
      'padding:18px;animation:tth-fade .35s ease;font-family:Raleway,sans-serif}',
      '@keyframes tth-fade{from{opacity:0}to{opacity:1}}',
      '.tth-card{position:relative;background:#fbf3e2;border:2px solid #a67c2e;outline:1px solid #c9a44a;',
      'outline-offset:5px;border-radius:6px;max-width:700px;width:100%;max-height:92vh;max-height:92dvh;',
      'overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.45);padding:38px 40px 30px;',
      'display:grid;grid-template-columns:200px 1fr;gap:30px;align-items:center;color:#2b2320}',
      '.tth-x{position:absolute;top:10px;right:10px;width:38px;height:38px;border-radius:50%;border:none;',
      'background:#571c26;color:#fbf3e2;font-size:19px;line-height:1;cursor:pointer;z-index:3;',
      'font-family:inherit}',
      '.tth-x:hover{background:#b4502e}',
      '.tth-esq{position:absolute;width:74px;height:74px;pointer-events:none;opacity:.9;z-index:1}',
      '.tth-esq.tl{top:4px;left:4px}.tth-esq.tr{top:4px;right:4px;transform:scaleX(-1)}',
      '.tth-portada{background:#571c26;padding:9px;border-radius:5px;box-shadow:0 12px 30px rgba(61,18,27,.35);',
      'position:relative;z-index:2}',
      '.tth-portada img{display:block;width:100%;border-radius:2px}',
      '.tth-cuerpo{position:relative;z-index:2}',
      '.tth-kicker{display:block;color:#b4502e;font-weight:700;letter-spacing:.16em;font-size:.68rem;',
      'text-transform:uppercase;margin-bottom:8px}',
      '.tth-titulo{font-family:"Playfair Display",serif;font-weight:800;color:#571c26;',
      'font-size:1.75rem;line-height:1.15;margin:0 0 4px}',
      '.tth-titulo span{display:block;font-size:.68em;font-weight:600;font-style:italic;color:#a67c2e}',
      '.tth-texto{font-size:.95rem;line-height:1.55;margin:12px 0 16px}',
      '.tth-banda{display:block;width:100%;height:14px;object-fit:cover;margin-top:18px;border-radius:2px;opacity:.95}',
      '.tth-nota{font-size:.8rem;color:#6b5c4d;margin-top:10px}',
      '.tth-link{display:inline-block;margin-top:8px;font-size:.85rem;color:#a67c2e}',
      /* ---- zona Brevo ---- */
      '.tth-form{display:flex;gap:10px;flex-wrap:wrap}',
      '.tth-form input{flex:1 1 160px;padding:11px 14px;font-size:.95rem;font-family:inherit;',
      'border:1.5px solid #a67c2e;border-radius:3px;background:#fdfaf2;color:#9c8f7c}',
      '.tth-form button{flex:0 0 auto;padding:11px 22px;font-size:.95rem;font-weight:700;font-family:inherit;',
      'letter-spacing:.04em;color:#fbf3e2;background:#b4502e;border:none;border-radius:3px;',
      'cursor:not-allowed;opacity:.85}',
      '@media (max-width:640px){',
      '#tth-popup-overlay{padding:10px}',
      '.tth-card{grid-template-columns:1fr;padding:46px 20px 24px;gap:20px;text-align:center;',
      'max-height:94vh;max-height:94dvh}',
      '.tth-portada{max-width:170px;margin:0 auto}',
      '.tth-form{flex-direction:column}',
      '.tth-form input,.tth-form button{width:100%;flex:0 0 auto}',
      '.tth-esq{width:52px;height:52px}',
      '.tth-titulo{font-size:1.45rem}}'
    ].join('');
    document.head.appendChild(css);

    var overlay = document.createElement('div');
    overlay.id = 'tth-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Regalo: Tres cuentos de Tailandia');

    overlay.innerHTML =
      '<div class="tth-card">' +
        '<button class="tth-x" type="button" aria-label="Cerrar">✕</button>' +
        '<img class="tth-esq tl" src="https://lh3.googleusercontent.com/d/1XovJfHuBgY3KZa-2Xq0othFak1fr6O2W" alt="" aria-hidden="true">' +
        '<img class="tth-esq tr" src="https://lh3.googleusercontent.com/d/1XovJfHuBgY3KZa-2Xq0othFak1fr6O2W" alt="" aria-hidden="true">' +
        '<div class="tth-portada">' +
          '<img src="https://lh3.googleusercontent.com/d/16Q7iHonyxQXhXbAM_kXOcKJ7lffW4wqT" alt="Portada del libro Tres cuentos de Tailandia">' +
        '</div>' +
        '<div class="tth-cuerpo">' +
          '<span class="tth-kicker">Un regalo para vos</span>' +
          '<p class="tth-titulo">Tres cuentos<span>de Tailandia</span></p>' +
          '<p class="tth-texto">Tres relatos de la tradición tailandesa, ilustrados y con una carta ' +
          'de bienvenida de Paula. Es de regalo: dejame tu mail y te llega solo.</p>' +
          '<div class="tth-brevo-slot">' +
            '<!-- ============================================================\n' +
            '     BREVO-EMBED-START\n' +
            '     PEGAR ACÁ el snippet del formulario de Brevo (versión compacta).\n' +
            '     Reemplazar TODO lo que hay entre BREVO-EMBED-START y\n' +
            '     BREVO-EMBED-END por ese código. El formulario de abajo es SOLO\n' +
            '     una maqueta visual: el campo está deshabilitado y no envía nada.\n' +
            '     ============================================================ -->' +
            '<form class="tth-form" aria-hidden="true">' +
              '<input type="email" placeholder="Tu mail" disabled>' +
              '<button type="button" disabled>Quiero mi libro</button>' +
            '</form>' +
            '<!-- BREVO-EMBED-END -->' +
          '</div>' +
          '<p class="tth-nota">Nada de spam: una carta corta de Tailandia, cada tanto. Te das de baja con un clic.</p>' +
          '<a class="tth-link" href="/regalo/">Ver de qué se trata el libro →</a>' +
          '<img class="tth-banda" src="https://lh3.googleusercontent.com/d/1yGw1wFY-g9iy9XgMnHG9CZ8Q8PaIXdfe" alt="" aria-hidden="true">' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    function close() {
      try { localStorage.setItem(LS_KEY, String(Date.now())); } catch (e) {}
      overlay.remove();
      css.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(ev) { if (ev.key === 'Escape') close(); }

    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) close(); });
    overlay.querySelector('.tth-x').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  }
})();
