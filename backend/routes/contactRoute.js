import express from "express";

import { createContact } from "../controllers/contactController.js";

const router = express.Router();

// Article routes
router.post("/", createContact);

export default router;
