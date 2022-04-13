import HttpException from '../../core/http-exception.mjs';
import queryConstructor from '../../utils/query-construstor.mjs';
import elastic from '../../utils/elastic.mjs';

import validateLocationRange from '../../utils/validate-location-range.mjs';
import validateTimeRange from '../../utils/validate-time-range.mjs';
import validateRequest from './validate-request.mjs';

async function queryPost(ctx) {
	const data = ctx.request.body;

	// Validate with JSON Schema.
	if (!validateRequest(data)) {
		throw new HttpException(
			'Malformed values in request body.',
			`${validateRequest.errors[0].instancePath}: ${validateRequest.errors[0].message}`,
			4001,
			400,
		);
	}

	// Validate time range.
	if (!validateTimeRange(data['@timestamp'].gte, data['@timestamp'].lte)) {
		throw new HttpException('Invalid time range.', '', 4002, 400);
	}

	// Validate subject location range
	if (
		!validateLocationRange(
			[
				data['locations.subject.x'].gte,
				data['locations.subject.y'].gte,
				data['locations.subject.z'].gte,
			],
			[
				data['locations.subject.x'].lte,
				data['locations.subject.y'].lte,
				data['locations.subject.z'].lte,
			],
			'subject',
		)
	) {
		throw new HttpException('Invalid subject location range.', '', 4003, 400);
	}

	// Validate object location range
	if (
		Object.prototype.hasOwnProperty.call(data, 'locations.object.x') &&
		data['locations.object.x'] !== null &&
		!validateLocationRange(
			[
				data['locations.object.x'].gte,
				data['locations.object.y'].gte,
				data['locations.object.z'].gte,
			],
			[
				data['locations.object.x'].lte,
				data['locations.object.y'].lte,
				data['locations.object.z'].lte,
			],
			'object',
		)
	) {
		throw new HttpException('Invalid object location range.', '', 4004, 400);
	}

	// Construst query DSL and execute search.
	let queryDSL;
	let result;
	try {
		queryDSL = queryConstructor(data);
	} catch (error) {
		console.log(error);
		throw new HttpException('Error constructing query DSL.', `${error.name}: ${error.message}`, 5001, 500);
	}

	try {
		result = await elastic.search(queryDSL);
	} catch (error) {
		throw new HttpException('Got an error while searching.', `${error.name}: ${error.message}`, 5002, 500);
	}

	ctx.body = result;
}

export default queryPost;
