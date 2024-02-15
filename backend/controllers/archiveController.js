import asyncHandler from "express-async-handler";
import Archive from "../models/archiveModel.js";

// @Desc Get all archives
// @route GET /api/archives
// @access Public
const getArchives = asyncHandler(async (req, res) => {
	try {
		const archives = await Archive.find().sort({ createdAt: -1 });

		res.json(archives);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Get a single archive
// @route GET /api/archives/:id
// @access Public
const getArchive = asyncHandler(async (req, res) => {
	try {
		const archive = await Archive.findById(req.params.id);

		res.json(archive);
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

// @Desc Create a new archive
// @route POST /api/archives
// @access Private
const createArchive = asyncHandler(async (req, res) => {
	try {
		const { title, post, date, serial_number } = req.body;

		const newArchive = new Archive({
			title,
			post,
			date,
			serial_number,
		});

		res.send(newArchive);

		await newArchive.save();
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { createArchive, getArchive, getArchives };
