import HttpException from '../core/http-exception.mjs';

const catchError = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		if (error instanceof HttpException) {
			// Response error code and message
			ctx.body = {
				code: error.errorCode,
				reason: error.reason,
				description: error.description,
			};
			// HTTP status code
			ctx.status = error.code;
		}
	}
};

export default catchError;
