import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		post: {
			type: Array,
			required: true,
		},
		serial_number: {
			type: String,
			required: true,
		},
		date: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Archive = mongoose.model("Archive", archiveSchema);

export default Archive;
