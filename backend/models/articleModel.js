import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		post: {
			type: Array,
			required: true,
		},
		imgURL: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
