class RequestException extends Error {
	constructor(message = 'Unknown request exception.', errorCode = 5000, code = 400) {
		super();
		this.errorCode = errorCode;
		this.code = code;
		this.message = message;
	}
}

export default RequestException;
