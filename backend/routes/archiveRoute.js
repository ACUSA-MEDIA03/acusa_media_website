import express from "express";

import {
	createArchive,
	getArchives,
	getArchive,
} from "../controllers/archiveController.js";

const router = express.Router();

// News routes
router.get("/", getArchives);
router.get("/:id", getArchive);
router.post("/", createArchive);

export default router;
