// Minimal script: fill copyright year and page metadata
document.addEventListener('DOMContentLoaded', function () {
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	var metaEl = document.getElementById('meta');
	if (metaEl) {
		var url = location.href;
		var modified = document.lastModified || '';
		metaEl.textContent = url + (modified ? ' — last modified: ' + modified : '');
	}
});

