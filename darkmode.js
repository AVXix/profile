let darkmode = localStorage.getItem("darkmode")

const themeSwitch = document.getElementById("theme-switch")

const enableDarkmode = () => {
	document.body.classList.add("darkmode")
	localStorage.setItem("darkmode", "active")
}

const disableDarkmode = () => {
    document.body.classList.remove("darkmode")
    localStorage.removeItem("darkmode")
}

if(darkmode === "active")

themeSwitch.addEventListener("click", () => {
	darkmode!=="active"? enable() : disableDarkmode()
}) 