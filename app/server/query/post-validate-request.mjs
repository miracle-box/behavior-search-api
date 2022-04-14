import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import createHttpException from '../../utils/create-http-exception.mjs';

import schema from './post-request-schema.mjs';

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);

/**
 * Validate `POST` `/query` HTTP body.
 * @param {Object} data query body to be validated
 */
function validateRequest(data) {
	if (!validate(data)) {
		throw createHttpException(4011, `${validate.errors[0].instancePath}: ${validate.errors[0].message}`);
	}
}

export default validateRequest;
