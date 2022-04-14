import HttpException from '../core/http-exception.mjs';
import statusCodes from '../core/status-codes.mjs';

export default function createHttpException(code, desc = '') {
	return new HttpException(
		statusCodes[code].message,
		statusCodes[code].description + desc,
		code,
		statusCodes[code].code,
	);
}
