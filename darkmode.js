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
  localStorage.setItem("darkmode", "inactive");
  if (themeSwitch) {
    themeSwitch.setAttribute('aria-pressed', 'false');
    themeSwitch.title = 'Switch to dark theme';
  }
};

// dark mode is default;
if (darkmode === "inactive") {
  disableDarkmode();
} else {
  // enable dark mode by default
  enableDarkmode();
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