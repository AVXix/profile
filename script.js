document.addEventListener('DOMContentLoaded', function() {
	// update copyright year
	const copyrightYear = document.getElementById('year');
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}

	// page meta info
	const meta = document.getElementById('meta');
	if (meta) {
		const currentUrl = location.href;
		const lastMod = document.lastModified || '';
		meta.textContent = currentUrl + (lastMod ? ' — last modified: ' + lastMod : '');
	}

	// contact form stuff
	const showContactBtn = document.getElementById('contact-btn');
	const formContainer = document.getElementById('contact-form');
	const theForm = document.getElementById('contact-form-element');
	const cancel = document.getElementById('cancel-btn');

	if (showContactBtn && formContainer) {
		showContactBtn.addEventListener('click', () => {
			showContactBtn.classList.add('hidden');
			formContainer.classList.remove('hidden');
		});

		if (cancel && theForm) {
			cancel.addEventListener('click', () => {
				formContainer.classList.add('hidden');
				showContactBtn.classList.remove('hidden');
				theForm.reset(); // clear the form
			});
		}
	}

	// tabs
	const tabs = document.querySelectorAll('.tab-btn');
	const panels = document.querySelectorAll('.tab-content');

	tabs.forEach(tab => {
		tab.addEventListener('click', function() {
			const which = this.getAttribute('data-tab');
			
			tabs.forEach(t => t.classList.remove('active'));
			panels.forEach(p => p.classList.remove('active'));
			
			this.classList.add('active');
			const panel = document.getElementById(which + '-tab');
			if (panel) panel.classList.add('active');
		});
	});
});

