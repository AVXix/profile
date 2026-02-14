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

	// Contact form toggle functionality
	var contactBtn = document.getElementById('contact-btn');
	var contactForm = document.getElementById('contact-form');
	var contactFormElement = document.getElementById('contact-form-element');
	var cancelBtn = document.getElementById('cancel-btn');

	if (contactBtn && contactForm && contactFormElement) {
		// Show form when button is clicked
		contactBtn.addEventListener('click', function() {
			contactBtn.classList.add('hidden');
			contactForm.classList.remove('hidden');
		});

		// Hide form and show button on cancel
		if (cancelBtn) {
			cancelBtn.addEventListener('click', function() {
				contactForm.classList.add('hidden');
				contactBtn.classList.remove('hidden');
				contactFormElement.reset();
			});
		}
	}
});

