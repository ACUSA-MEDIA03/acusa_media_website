import express from "express";

import {
	getArticles,
	createArticle,
} from "../controllers/articleController.js";

const router = express.Router();

// Article routes
router.get("/", getArticles);
router.post("/", createArticle);

export default router;
