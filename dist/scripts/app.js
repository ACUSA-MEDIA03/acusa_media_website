// Selectors
const nav = document.querySelector(".links");
const hamburgerMenu = document.querySelector(".burger");

// Events to trigger the nav bar being opened
hamburgerMenu.addEventListener("click", (e) => {
	nav.classList.toggle("links-open");

	hamburgerMenu.classList.toggle("fa-times");
});
