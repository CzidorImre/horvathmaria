document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nev = document.getElementById('field-nev').value.trim();
  const tipus = document.getElementById('field-tipus').value;
  const leiras = document.getElementById('field-leiras').value.trim();

  const uzenet = 'Ajánlatkérés\n\nNév: ' + nev + '\nTárgy: ' + tipus + '\nLeírás: ' + leiras;

  const copy = navigator.clipboard && navigator.clipboard.writeText
    ? navigator.clipboard.writeText(uzenet)
    : Promise.resolve();

  copy.finally(function () {
    document.getElementById('copy-confirm').hidden = false;
    window.open('https://m.me/maria.horvath.148116', '_blank');
  });
});

// Reference gallery lightbox
(function () {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.ref-thumb'));
  if (!thumbs.length) return;

  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxCounter = document.getElementById('lightbox-counter');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');

  var currentIndex = 0;
  var lastFocused = null;
  var scrollY = 0;

  function preload(index) {
    new Image().src = thumbs[(index + thumbs.length) % thumbs.length].querySelector('img').src;
  }

  function show(index) {
    currentIndex = (index + thumbs.length) % thumbs.length;
    var img = thumbs[currentIndex].querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + thumbs.length;
    // Neighbours are ready before the next swipe lands
    preload(currentIndex + 1);
    preload(currentIndex - 1);
  }

  function open(index) {
    // The thumb itself, not activeElement — a tap does not always focus the button
    lastFocused = thumbs[(index + thumbs.length) % thumbs.length];
    show(index);
    lightbox.hidden = false;
    // Pin the page instead of just hiding overflow, or iOS scrolls behind the overlay
    scrollY = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = -scrollY + 'px';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
    else if (e.key === 'Tab') {
      var focusable = [closeBtn, prevBtn, nextBtn];
      var idx = focusable.indexOf(document.activeElement);
      e.preventDefault();
      if (e.shiftKey) idx = (idx <= 0 ? focusable.length - 1 : idx - 1);
      else idx = (idx === -1 || idx === focusable.length - 1 ? 0 : idx + 1);
      focusable[idx].focus();
    }
  }

  thumbs.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () { open(index); });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { show(currentIndex + 1); });

  // Swipe left/right to move between photos on touch screens
  var touchStartX = 0;
  var touchStartY = 0;
  var tracking = false;
  var swiped = false;

  lightbox.addEventListener('touchstart', function (e) {
    tracking = e.touches.length === 1;
    if (!tracking) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    swiped = true;
    show(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  lightbox.addEventListener('click', function (e) {
    // A swipe that ends on the backdrop must not read as a dismiss tap
    if (swiped) { swiped = false; return; }
    if (e.target === lightbox) close();
  });
})();
