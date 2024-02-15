import express from "express";

import {
	createArticle,
	getArticles,
	getArticle,
} from "../controllers/articleController.js";

const router = express.Router();

// Article routes
router.get("/", getArticles);
router.get("/:id", getArticle);
router.post("/", createArticle);

export default router;
