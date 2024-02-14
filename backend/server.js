import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import Mailjet from "node-mailjet";

// Import MongoDB connection file
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// Importing the routes
import articleRoute from "./routes/articleroute.js";

// Initialize express app
const app = express();

// Express body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
connectDB();

// API routes

app.use("/api/articles", articleRoute);

app.get("/", (req, res) => {
	res.send("API is up and running!!!");
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
