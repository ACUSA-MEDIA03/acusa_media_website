// An handler that handles any case of a route not found
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// An error handler that handles all error that comes up
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// If mongoose not found, set error to 404 and change message
	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 404;
		message = "Resource not found";
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { notFound, errorHandler };
