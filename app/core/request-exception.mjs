class RequestException extends Error {
	constructor(message = 'Unknown request exception.', errorCode = 5000, code = 400) {
		super();
		this.errorCode = errorCode;
		this.code = code;
		this.msg = message;
	}
}

export default RequestException;
