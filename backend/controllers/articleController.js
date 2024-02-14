import asyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";
import cloudinary from "../middleware/cloudinary.js";

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
		const { title, post, img } = req.body;

		// Save image to cloudinary
		const uploadResponse = await cloudinary.v2.uploader.upload(img, {
			upload_preset: "acusamedia",
		});

		res.send(uploadResponse);

		// const newArticle = new Article({ title, post });

		// Save new article to DB

		// await newArticle.save();
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { getArticles, createArticle };
