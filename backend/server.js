import path from "path";

import dotenv from "dotenv";
dotenv.config();

import express from "express";

import cors from "cors";

// Import MongoDB connection file
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// Importing the routes
import contactRoute from "./routes/contactRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import articleRoute from "./routes/articleRoute.js";
import newsRoute from "./routes/newsRoute.js";
import archiveRoute from "./routes/archiveRoute.js";
import galleryRoute from "./routes/gallyerRoute.js";

// Initialize express app
const app = express();

// Cross origin requests
app.use(cors({ credentials: true }));

// Express body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// 7;
// const __dirname = path.resolve();
// console.log(__dirname);

// Connect MongoDB
connectDB();

// API routes

app.use("/api/contact", contactRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/articles", articleRoute);
app.use("/api/news", newsRoute);
app.use("/api/archives", archiveRoute);
app.use("/api/gallery", galleryRoute);

// Error middleware
// app.use(notFound);
app.use(errorHandler);

// Set static folder
if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();

	app.use(express.static(path.join(__dirname, "dist")));
} else {
	app.get("/", (req, res) => {
		res.send("API is up and running!!!");
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
