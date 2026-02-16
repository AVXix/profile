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

	const activateTab = (which) => {
		if (!which) return;
		tabs.forEach(t => t.classList.remove('active'));
		panels.forEach(p => p.classList.remove('active'));
		const tabBtn = document.querySelector(`.tab-btn[data-tab="${which}"]`);
		if (tabBtn) tabBtn.classList.add('active');
		const panel = document.getElementById(which + '-tab');
		if (panel) panel.classList.add('active');
	};

	tabs.forEach(tab => {
		tab.addEventListener('click', function() {
			const which = this.getAttribute('data-tab');
			activateTab(which);
		});
	});

	// in-page anchor jump links (works with tabs)
	const jumpLinks = document.querySelectorAll('a.jump-link[href^="#"]');
	jumpLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const which = link.getAttribute('data-tab');
			const href = link.getAttribute('href') || '';
			const id = href.startsWith('#') ? href.slice(1) : '';
			if (!id) return;

			e.preventDefault();
			activateTab(which);
			window.setTimeout(() => {
				const target = document.getElementById(id);
				if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// keep URL hash in sync without forcing native jump
				history.pushState(null, '', '#' + id);
			}, 0);
		});
	});

	// rotating quotes (every 2 seconds)
	const quoteText = document.getElementById('quote-text');
	const quoteAuthor = document.getElementById('quote-author');
	const quoteBox = document.querySelector('.quote-rotator');
	if (quoteText && quoteAuthor) {
		const quotes = [
			{
				text: 'He who has a why to live can bear almost any how.',
				author: 'Friedrich Nietzsche'
			},
			{
				text: 'What does not kill me makes me stronger.',
				author: 'Friedrich Nietzsche'
			},
			{
				text: 'If you want the universe to make sense, start by questioning your assumptions—not everyone else’s.',
				author: 'Rick (inspired)'
			},
			{
				text: 'Burn the script. Build something real. Then defend it like it matters.',
				author: 'Johnny Silverhand (inspired)'
			}
		];

		let quoteIndex = 0;
		const swapQuote = () => {
			const q = quotes[quoteIndex % quotes.length];
			quoteText.textContent = '“' + q.text + '”';
			quoteAuthor.textContent = '— ' + q.author;
			quoteIndex += 1;
		};

		const renderQuote = () => {
			if (quoteBox) quoteBox.classList.add('is-fading');
			window.setTimeout(() => {
				swapQuote();
				if (quoteBox) quoteBox.classList.remove('is-fading');
			}, 250);
		};

		swapQuote();
		setInterval(renderQuote, 5000);
	}
});

