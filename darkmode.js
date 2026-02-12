let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  if (themeSwitch) {
    themeSwitch.setAttribute('aria-pressed', 'true');
    themeSwitch.title = 'Switch to light theme';
  }
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.removeItem("darkmode");
  if (themeSwitch) {
    themeSwitch.setAttribute('aria-pressed', 'false');
    themeSwitch.title = 'Switch to dark theme';
  }
};

// restore saved state (only runs if value was 'active')
if (darkmode === "active") {
  enableDarkmode();
} else {
  // ensure correct aria state on load
  if (themeSwitch) themeSwitch.setAttribute('aria-pressed', 'false');
}

// attach handler only if the button exists
if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    // refresh variable from storage each click
    darkmode = localStorage.getItem("darkmode");
    if (darkmode !== "active") enableDarkmode();
    else disableDarkmode();
  });
}