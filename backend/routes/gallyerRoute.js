import express from "express";

import { getPhotos } from "../controllers/galleryController.js";

const router = express.Router();

// Article routes
router.get("/", getPhotos);

export default router;
