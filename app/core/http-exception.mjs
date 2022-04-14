class HttpException extends Error {
	/**
	 * Construct an `HttpException` object.
	 *
	 * It's recommended to use `createHttpException` to handle errors.
	 *
	 * @param {String} reason describe error reason briefly
	 * @param {String} description more detailed error message
	 * @param {Number} errorCode error code of the error
	 * @param {Number} code HTTP status code
	 * @returns `HttpException` object
	 */
	constructor(reason = 'Unknown error.', description = 'no description provided.', errorCode = 5000, code = 500) {
		super();
		this.reason = reason;
		this.description = description;
		this.errorCode = errorCode;
		this.code = code;
	}
}

export default HttpException;
