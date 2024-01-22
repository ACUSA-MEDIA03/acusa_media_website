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

// Display the latest news
async function displayLatestNews() {
	// Get the news from the database
	const res = await fetch("./data/news.json");
	const data = await res.json();
	const latestNews = data.news[0];

	// Check for the length of the news post
	const newsPost =
		latestNews.post.length <= 500
			? latestNews.post
			: `${latestNews.post.substring(0, 500)}...`;

	// Create the latest news details
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

	// Insert latest news section to the HTML page
	document.querySelector("#latest-news-section").appendChild(div);
}

// Display the all news
async function displayAllNews() {
	// Get all the news from the database
	const res = await fetch("./data/news.json");
	const data = await res.json();
	const allNews = data.news;

	// Loop through the news and display them one-by-one
	allNews.forEach((news) => {
		const div = document.createElement("div");
		div.classList.add("box");
		div.innerHTML = `
						<div class="img">
							<img
								src="./images/${news.imgURL}"
								alt="${news.title}"
							/>
						</div>
						<div class="details">
							<h5>${news.title}</h5>
							<h6>${news.date}</h6>
							<a class="btn btn-black"href="news-details.html?id=${news.id}"
								>Continue reading</a
							>
						</div>
					`;

		// Insert the new news into the HTML page
		document.querySelector("#boxes").appendChild(div);
	});
}

// Display the top 3 news for the home page
async function displayTopThreeNews() {
	// Get all the news from the database
	const res = await fetch("./data/news.json");
	const data = await res.json();
	const topThreeNews = data.news.slice(0, 3);

	// Loop through the news and display them one-by-one
	topThreeNews.forEach((news) => {
		const div = document.createElement("div");
		div.classList.add("box");
		div.innerHTML = `
						<div class="img">
							<img
								src="./images/${news.imgURL}"
								alt="${news.title}"
							/>
						</div>
						<div class="details">
							<h5>${news.title}</h5>
							<h6>${news.date}</h6>
							<a class="btn btn-black"href="news-details.html?id=${news.id}"
								>Continue reading</a
							>
						</div>
					`;

		// Insert the new news into the HTML page
		document.querySelector("#boxes").appendChild(div);
	});
}

// Display the news details
async function displayNewsDetails() {
	// Get the search query from the URL
	const newsId = window.location.search.split("=")[1];

	// Get the news from the database
	const res = await fetch("./data/news.json");
	const data = await res.json();
	const news = data.news;

	// Get the news that correlates with the specific ID
	const newsDetails = news.filter((res) => {
		return res.id == newsId;
	});

	// Create a news detail
	const div = document.createElement("div");
	div.classList.add("details");
	div.innerHTML = `
					<div class="head">
						<h4>${newsDetails[0].title}</h4>
						<h5>Posted on ${newsDetails[0].date}</h5>
					</div>
					<div class="content">
						<p>${newsDetails[0].post}</p>
					</div>
					`;

	// Insert the news image to the showcase section
	const img = document.createElement("img");
	img.src = `images/${newsDetails[0].imgURL}`;
	img.alt = newsDetails[0].title;

	// Insert the news and showcase section
	document.querySelector("#news-details").appendChild(div);
	document.querySelector("#showcase-section").appendChild(img);

	// Change the title of the page
	document.title = `${newsDetails[0].title} | ACUSA Media`;
}

// Init on the DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
	switch (window.location.pathname) {
		case "/":
		case "/dist/index.html":
			typeWriter();
			displayTopThreeNews();
			break;
		case "/dist/news.html":
			displayLatestNews();
			displayAllNews();
			break;
		case "/dist/news-details.html":
			displayNewsDetails();
			break;
	}
}
