import asyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";

// @Desc Get all articles
// @route GET /api/articles
// @access Public
const getArticles = asyncHandler(async (req, res) => {
	try {
		const articles = await Article.find().sort({ createdAt: -1 });

		res.json(articles);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Get an article
// @route GET /api/articles/:id
// @access Public
const getArticle = asyncHandler(async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);

		res.json(article);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Create a new article
// @route POST /api/articles
// @access Private
const createArticle = asyncHandler(async (req, res) => {
	try {
		const {
			title,
			post,
			article_image,
			writer_name,
			phone_number,
			twitter_handle,
			instagram_handle,
			writer_image,
			date,
		} = req.body;

		const newArticle = new Article({
			title,
			post,
			article_image,
			writer_image,
			writer_name,
			phone_number,
			twitter_handle,
			instagram_handle,
			date,
		});

		res.send(newArticle);

		await newArticle.save();
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { createArticle, getArticles, getArticle };
