import asyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";

// @Desc Get all the articles
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

// @Desc Create a new article
// @route POST /api/articles
// @access Private
const createArticle = asyncHandler(async (req, res) => {
	try {
		const { title, post } = req.body;

		res.send(req.body.post);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { getArticles, createArticle };
