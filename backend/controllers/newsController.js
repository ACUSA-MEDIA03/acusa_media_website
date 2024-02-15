import asyncHandler from "express-async-handler";
import News from "../models/newsModel.js";

// @Desc Get all news
// @route GET /api/news
// @access Public
const getNews = asyncHandler(async (req, res) => {
	try {
		const news = await News.find().sort({ createdAt: -1 });

		res.json(news);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Get a single news
// @route GET /api/news/:id
// @access Public
const getSingleNews = asyncHandler(async (req, res) => {
	try {
		const news = await News.findById(req.params.id);

		res.json(news);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Create a new news
// @route POST /api/news
// @access Private
const createNews = asyncHandler(async (req, res) => {
	try {
		const { title, post, news_image, date } = req.body;

		const newSingleNews = new News({
			title,
			post,
			news_image,
			date,
		});

		res.send(newSingleNews);

		await newSingleNews.save();
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { createNews, getNews, getSingleNews };
