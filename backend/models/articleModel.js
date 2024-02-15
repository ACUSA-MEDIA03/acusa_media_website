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
		article_image: {
			type: String,
			required: true,
		},
		writer_name: {
			type: String,
		},
		phone_number: {
			type: String,
		},
		twitter_handle: {
			type: String,
		},
		instagram_handle: {
			type: String,
		},
		writer_image: {
			type: String,
		},
		date: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
