import requestException from '../core/request-exception.mjs';

const catchError = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		if (error instanceof requestException) {
			// Response error code and message
			ctx.body = {
				code: error.code,
				message: error.message,
			};
			// HTTP status code
			ctx.status = error.code;
		}
	}
};

export default catchError;
