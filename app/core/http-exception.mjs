class HttpException extends Error {
	constructor(reason = 'Unknown error.', description = 'no description provided.', errorCode = 5000, code = 500) {
		super();
		this.reason = reason;
		this.description = description;
		this.errorCode = errorCode;
		this.code = code;
	}
}

export default HttpException;
