import express from "express";

import { createFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// Article routes
router.post("/", createFeedback);

export default router;
