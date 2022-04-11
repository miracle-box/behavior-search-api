import fs from 'node:fs';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

let schema = {};

schema = JSON.parse(fs.readFileSync('./app/resources/query-request-schema.json'));

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);

export default validate;
