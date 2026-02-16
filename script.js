document.addEventListener('DOMContentLoaded', () => {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	const metaEl = document.getElementById('meta');
	if (metaEl) {
		// Format document.lastModified (if valid)
		const lastModRaw = document.lastModified || '';
		const lastModDate = lastModRaw ? new Date(lastModRaw) : null;
		const formattedLastMod = (lastModDate && !Number.isNaN(lastModDate.getTime()))
			? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(lastModDate)
			: '';
		metaEl.textContent = formattedLastMod ? ('Last updated: ' + formattedLastMod) : '';
	}

	const contactBtn = document.getElementById('contact-btn');
	const contactCard = document.getElementById('contact-form');
	const contactForm = document.getElementById('contact-form-element');
	const cancelBtn = document.getElementById('cancel-btn');

	if (contactBtn && contactCard) {
		contactBtn.addEventListener('click', () => {
			contactBtn.classList.add('hidden');
			contactCard.classList.remove('hidden');
		});
	}

	if (cancelBtn && contactBtn && contactCard) {
		cancelBtn.addEventListener('click', () => {
			contactCard.classList.add('hidden');
			contactBtn.classList.remove('hidden');
			if (contactForm) contactForm.reset();
		});
	}

	const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
	const tabPanels = Array.from(document.querySelectorAll('.tab-content'));

	// Tab switch helper
	function showPortfolioTab(tabKey) {
		if (!tabKey) return;

		for (const btn of tabButtons) btn.classList.remove('active');
		for (const panel of tabPanels) panel.classList.remove('active');

		const btn = document.querySelector(`.tab-btn[data-tab="${tabKey}"]`);
		if (btn) btn.classList.add('active');

		const panel = document.getElementById(tabKey + '-tab');
		if (panel) panel.classList.add('active');
	}

	for (const btn of tabButtons) {
		btn.addEventListener('click', () => showPortfolioTab(btn.getAttribute('data-tab')));
	}

	// Jump-link: switch tab first, then scroll
	const jumpAnchors = document.querySelectorAll('a.jump-link[href^="#"]');
	jumpAnchors.forEach((a) => {
		a.addEventListener('click', (e) => {
			const href = a.getAttribute('href') || '';
			const targetId = href.startsWith('#') ? href.slice(1) : '';
			if (!targetId) return;

			e.preventDefault();
			showPortfolioTab(a.getAttribute('data-tab'));

			// Next tick: panel exists + layout ready
			window.setTimeout(() => {
				const target = document.getElementById(targetId);
				if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.pushState(null, '', '#' + targetId);
			}, 0);
		});
	});

	const quoteBox = document.querySelector('.quote-rotator');
	const quoteTextEl = document.getElementById('quote-text');
	const quoteAuthorEl = document.getElementById('quote-author');

	if (quoteTextEl && quoteAuthorEl) {
	
		const quotes = [
			{ text: 'He who has a why to live can bear almost any how.', author: 'Friedrich Nietzsche' },
			{ text: 'What does not kill me makes me stronger.', author: 'Friedrich Nietzsche' },
			{ text: 'If you want the universe to make sense, start by questioning your assumptions—not everyone else’s.', author: 'Rick (inspired)' },
			{ text: 'Burn the script. Build something real. Then defend it like it matters.', author: 'Johnny Silverhand (inspired)' },
			{ text: 'Swap meat for chrome, live a BD fantasy, whatever, but at the end of it all, its the code you live by that defines who you are.', author: 'Johnny Silverhand (inspired)' }
		];

		let i = 0;
		function paintQuote() {
			const q = quotes[i % quotes.length];
			quoteTextEl.textContent = '“' + q.text + '”';
			quoteAuthorEl.textContent = '— ' + q.author;
			i += 1;
		}

		// Fade animation hook (CSS class)
		function fadeSwap() {
			if (quoteBox) quoteBox.classList.add('is-fading');
			window.setTimeout(() => {
				paintQuote();
				if (quoteBox) quoteBox.classList.remove('is-fading');
			}, 250);
		}

		paintQuote();
		window.setInterval(fadeSwap, 5000);
	}
});

