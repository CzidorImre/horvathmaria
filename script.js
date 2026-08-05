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
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');

  var currentIndex = 0;
  var lastFocused = null;

  function show(index) {
    currentIndex = (index + thumbs.length) % thumbs.length;
    var img = thumbs[currentIndex].querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.alt;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
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
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
})();
