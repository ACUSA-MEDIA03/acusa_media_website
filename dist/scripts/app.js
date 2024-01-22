// Selectors
const nav = document.querySelector(".links");
const hamburgerMenu = document.querySelector(".burger");

// Events to trigger the nav bar being opened
hamburgerMenu.addEventListener("click", (e) => {
	// Make the Nav links display
	nav.classList.toggle("links-open");

	// Toggle the hamburger menu to a close icon
	hamburgerMenu.classList.toggle("fa-times");
});

// Typewriter effect on the Home page showcase
class Typewriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = "";
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() {
		// Current Index of words
		const current = this.wordIndex % this.words.length;

		// Get full text of the word
		const fullTxt = this.words[current];

		// Check if delecting
		if (this.isDeleting) {
			// Remove a character
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// Add a character
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into Element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Initial Type speed
		let typeSpeed = 300;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		// Check and see if the word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// Make a pause at the end
			typeSpeed = this.wait;

			// Set delete to true
			this.isDeleting = true;
		} else if ((this, this.isDeleting && this.txt === "")) {
			this.isDeleting = false;

			// Move to the next word

			this.wordIndex++;

			// Pause before start typing
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

// Typewriter function
function typeWriter() {
	const txtElement = document.querySelector(".txt-type");
	const words = JSON.parse(txtElement.getAttribute("data-words"));
	const wait = txtElement.getAttribute("data-wait");

	// Init Typewriter
	new Typewriter(txtElement, words, wait);
}

// Init Typewriter effect on the DOM Load
document.addEventListener("DOMContentLoaded", init);

// Display the latest news
async function displayLatestNews() {
	const res = await fetch("./data/news.json");
	const data = await res.json();
	const latestNews = data.news[0];

	const newsPost =
		latestNews.post.length <= 500
			? latestNews.post
			: `${latestNews.post.substring(0, 500)}...`;
	console.log(latestNews);

	const div = document.createElement("div");
	div.classList.add("latest-news");
	div.innerHTML = `
					<div class="img">
						<img
							src="images/${latestNews.imgURL}"
							alt="${latestNews.title}"
						/>
					</div>
					<div class="news-details">
						<h5>${latestNews.title}</h5>
						<h6>${latestNews.date}</h6>
						<p>
							${newsPost}
						</p>
						<a class="btn btn-black" href="news-details.html?id=${latestNews.id}"
							>Continue reading</a
						>
					</div>
	`;

	document.querySelector("#latest-news-section").appendChild(div);
}

// Display the news details
async function displayNewsDetails() {
	const newsId = window.location.search.split("=")[1];
	console.log(typeof newsId);

	const res = await fetch("./data/news.json");
	const data = await res.json();
	const news = data.news;

	console.log(news);

	const newsDetails = news.filter((res) => {
		return res.id == newsId;
	});

	console.log(newsDetails);
}

// Init App
function init() {
	switch (window.location.pathname) {
		case "/":
		case "/dist/index.html":
			typeWriter();
			break;
		case "/dist/news.html":
			displayLatestNews();
			break;
		case "/dist/news-details.html":
			displayNewsDetails();
			break;
	}
}
