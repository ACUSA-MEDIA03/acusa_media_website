import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		post: {
			type: Array,
			required: true,
		},
		news_image: {
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

const News = mongoose.model("News", newsSchema);

export default News;
