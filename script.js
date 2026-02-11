// simple footer updates
document.addEventListener('DOMContentLoaded', function () {
  var meta = document.getElementById('meta');
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (meta) meta.textContent = window.location.href + ' — ' + document.lastModified;
});
 

