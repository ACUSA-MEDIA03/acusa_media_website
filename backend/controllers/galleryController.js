import dotenv from "dotenv";
dotenv.config();

import asyncHandler from "express-async-handler";
import cloudinary from "../middleware/cloudinary.js";

// @Desc Get all photo
// @route GET /api/gallery
// @access Public
const getPhotos = asyncHandler(async (req, res) => {
	try {
		await cloudinary.v2.api.resources(
			{
				type: "upload",
				prefix: "acusamedia/gallery", // add your folder
			},
			function (error, result) {
				res.json(result.resources);
			}
		);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { getPhotos };
