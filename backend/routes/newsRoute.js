import express from "express";

import {
	createNews,
	getNews,
	getSingleNews,
} from "../controllers/newsController.js";

const router = express.Router();

// News routes
router.get("/", getNews);
router.get("/:id", getSingleNews);
router.post("/", createNews);

export default router;
