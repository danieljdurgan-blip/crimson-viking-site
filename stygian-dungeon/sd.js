// Stygian Dungeon landing page: menu, buy bar and picture viewer. Everything works as plain links without it.
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // menu on small screens
  var nav = $('.nav'), toggle = $('.nav__toggle');
  function setMenu(open) { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  $$('.nav__menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); } });

  // sticky buy bar on phones, once the hero has scrolled away
  var hero = $('.hero'), bar = $('.sticky-cta');
  if ('IntersectionObserver' in window && hero && bar) {
    new IntersectionObserver(function (entries) {
      var e = entries[0], gone = !e.isIntersecting && e.boundingClientRect.top < 0;
      bar.classList.toggle('show', gone); bar.setAttribute('aria-hidden', gone ? 'false' : 'true');
      var link = $('a', bar); if (link) link.tabIndex = gone ? 0 : -1;
    }).observe(hero);
  }

  // picture viewer: every .lb link opens in it, in page order, with arrows and Esc
  var box = $('.lightbox'), img = $('img', box), cap = $('figcaption', box), closeBtn = $('.lightbox__close', box);
  var all = [], index = 0, opener = null;
  $$('.lb').forEach(function (a) { if (!all.some(function (b) { return b.href === a.href; })) all.push(a); });
  function show(i) {
    index = (i + all.length) % all.length;
    var a = all[index]; img.src = a.href; img.alt = a.getAttribute('data-alt') || ''; cap.textContent = img.alt;
  }
  function open(a) { opener = a; show(all.findIndex(function (b) { return b.href === a.href; })); box.hidden = false; document.body.style.overflow = 'hidden'; closeBtn.focus(); }
  function close() { box.hidden = true; img.removeAttribute('src'); document.body.style.overflow = ''; if (opener) opener.focus(); }
  $$('.lb').forEach(function (a) { a.addEventListener('click', function (e) { if (e.ctrlKey || e.metaKey || e.shiftKey) return; e.preventDefault(); open(a); }); });
  closeBtn.addEventListener('click', close);
  $('.lightbox__prev', box).addEventListener('click', function () { show(index - 1); });
  $('.lightbox__next', box).addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(index - 1); else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'Tab') { var f = $$('button', box); var first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
  // a swipe left or right moves between pictures
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 60) show(index + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
})();
