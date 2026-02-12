Dark / Light Theme — Implementation Notes

Purpose

This document explains how the light/dark theme toggle works in this project, which files are involved, how the icons are used, how persistence and accessibility are handled, and quick steps to test and extend the implementation.

Files involved

- `index.html` — contains the theme toggle button (`#theme-switch`) with two images:
  - `images/light_mode.svg` (shown when page is in light mode)
  - `images/dark_mode.svg` (shown when page is in dark mode)
- `darkmode.js` — JavaScript that toggles the `.darkmode` class on `<body>`, persists the theme to `localStorage`, and updates accessibility attributes on the button.
- `style.css` — CSS custom properties (variables) define colors for the default (light) theme and the dark theme. It also contains rules that show/hide the correct icon depending on the presence of `.darkmode` on the `body`.
- `images/` — contains `light_mode.svg` and `dark_mode.svg` image assets used by the toggle.

How it works (contract)

- Input: user clicks the round button with `id="theme-switch"` (or focuses it and presses Enter/Space).
- Output: the page theme switches between light and dark by adding/removing `.darkmode` on the `document.body`; the visible icon swaps accordingly.
- Persistence: the script writes `localStorage.setItem('darkmode','active')` for dark mode and removes that key for light mode; on page load the script reads `localStorage` and restores state.
- Accessibility: the button has `aria-pressed` set to `true`/`false` and a `title` that updates to indicate the action.

Implementation details

1. CSS variables
   - `:root` defines the default (light) variables, for example `--bg`, `--text`, `--muted`.
   - When `.darkmode` is present on the `body`, those variables are overridden to dark values. All colors on the page use these variables, so changing the theme switches visuals site-wide.

2. Icons and their visibility
   - The toggle contains two `<img>` tags: one with class `.theme-icon--light` and one with `.theme-icon--dark`.
   - `style.css` uses rules like:
     - `#theme-switch .theme-icon--dark { display: none; }`
     - `.darkmode #theme-switch .theme-icon--light { display: none; }`
     - `.darkmode #theme-switch .theme-icon--dark { display: block; }`
   - This makes the correct icon visible automatically when the theme changes.

3. JavaScript behavior (`darkmode.js`)
   - On load, the script reads `localStorage.getItem('darkmode')`. If the value is `"active"`, it calls `enableDarkmode()` to add the `.darkmode` class.
   - `enableDarkmode()` adds the class, stores the value in `localStorage`, sets `aria-pressed="true"`, and updates the button `title`.
   - `disableDarkmode()` removes the class, removes the `localStorage` key, sets `aria-pressed="false"`, and updates the `title`.
   - Clicking the button toggles these functions.

Accessibility notes

- The toggle is a `<button>` element, so keyboard activation (Enter/Space) works by default.
- The script updates `aria-pressed` and `title` so screen readers and sighted users get correct feedback.
- Consider also adding `aria-label` which already exists in the current markup (`aria-label="Toggle dark mode"`).

Testing locally (quick)

1. Open the `index.html` file in a browser (double-click or run a local server):

```bash
# from project root
python3 -m http.server 8000
# then open http://localhost:8000 in a browser
```

2. Click the theme button at the top-right. The page background/text colors should flip and the icon should swap.
3. Reload the page — the chosen theme should persist.
4. Test keyboard accessibility: Tab to the button and press Enter or Space — theme should toggle.

Troubleshooting

- If icons don't appear, verify the files exist at `images/light_mode.svg` and `images/dark_mode.svg` and that the `src` paths in `index.html` are correct.
- If styles don't seem to change, ensure `style.css` is loaded and that `.darkmode` is being added to the `<body>` (open DevTools and inspect).
- If persistence fails, check browser cookie/storage restrictions (private modes or strict privacy settings can block `localStorage`).

Possible improvements (low-risk)

- Inline SVGs: embedding the SVG markup directly into `index.html` (instead of `<img>`) lets you control colors via CSS `fill` and allows smoother animations. If you want that, I can convert the SVGs to inline code and update the CSS to use `currentColor`.
- Respect user system preference: detect `prefers-color-scheme` on first load and set the initial theme accordingly (only if the user hasn't already chosen a theme). Example:

```js
if (!localStorage.getItem('darkmode')) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkmode();
  }
}
```

- Add a small CSS transition for background/text so the change animates smoothly.

Requirements coverage

- "make a file of how its implmented the night and dark mode" — Done (this file: `DARKMODE_README.md`).

If you'd like, I can:
- Convert the SVG files to inline SVG for better theming, or
- Implement `prefers-color-scheme` detection and a small transition animation.

Which of those would you like next?
