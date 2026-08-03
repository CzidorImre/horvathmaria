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
