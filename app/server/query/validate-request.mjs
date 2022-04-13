import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import schema from './request-schema.mjs';

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);

export default validate;
