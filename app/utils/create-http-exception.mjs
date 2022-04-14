import HttpException from '../core/http-exception.mjs';
import statusCodes from '../core/status-codes.mjs';

/**
 * A helper that helps you creating `HttpException`s.
 * @param {Number} code status code
 * @param {String} desc error description
 * @returns `HttpException` object
 */
export default function createHttpException(code, desc = '') {
	return new HttpException(
		statusCodes[code].message,
		statusCodes[code].description + desc,
		code,
		statusCodes[code].code,
	);
}
