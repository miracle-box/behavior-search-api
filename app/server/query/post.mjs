import createHttpException from '../../utils/create-http-exception.mjs';
import queryConstructor from '../../utils/query-construstor.mjs';
import elastic from '../../utils/elastic.mjs';

import validateLocationRange from '../../utils/validate-location-range.mjs';
import validateTimeRange from '../../utils/validate-time-range.mjs';
import filterResponse from './post-filter-response.mjs';
import validateRequest from './post-validate-request.mjs';

function getLocation(data, prop, sub) {
	return [data[`${prop}.x`][sub], data[`${prop}.y`][sub], data[`${prop}.z`][sub]];
}

async function queryPost(ctx) {
	const data = ctx.request.body;

	// Validate with JSON Schema.
	validateRequest(data);

	// Validate time range.
	validateTimeRange(data['@timestamp'].gte, data['@timestamp'].lte);

	// Validate subject location range
	validateLocationRange(
		getLocation(data, 'locations.subject', 'gte'),
		getLocation(data, 'locations.subject', 'lte'),
		'subject',
	);

	// Validate object location range
	if (Object.prototype.hasOwnProperty.call(data, 'locations.object.x') && data['locations.object.x'] !== null) {
		validateLocationRange(
			getLocation(data, 'locations.object', 'gte'),
			getLocation(data, 'locations.object', 'lte'),
			'object',
		);
	}

	// Construst query DSL and execute search.
	let queryDSL;
	try {
		queryDSL = queryConstructor(data);
	} catch (error) {
		throw createHttpException(5011, `${error.name}: ${error.message}`);
	}

	let result;
	try {
		result = await elastic.search(queryDSL);
	} catch (error) {
		throw createHttpException(5021, `${error.name}: ${error.message}`);
	}

	let response;
	try {
		response = filterResponse(result);
	} catch (error) {
		throw createHttpException(5031, `${error.name}: ${error.message}`);
	}

	ctx.body = response;
}

export default queryPost;
