import config from '../../config/config.mjs';

function isRangeObject(object) {
	if (object === null) return false;

	return (
		Object.prototype.hasOwnProperty.call(object, 'gte') &&
		Object.prototype.hasOwnProperty.call(object, 'lte')
	);
}

function getRangeQuery(prop, object) {
	const queryProp = {};
	queryProp[prop] = {gte: object.gte, lte: object.lte};
	return {range: {...queryProp}};
}

function getRangeQueries(q) {
	const queries = [];

	for (const key in q) {
		if (isRangeObject(q[key])) {
			queries.push(getRangeQuery(key, q[key]));
		}
	}

	return queries;
}

function isTermsObject(object) {
	if (!Array.isArray(object)) {
		return false;
	}

	for (const element of object) {
		if (typeof element !== 'string') return false;
	}

	return true;
}

function getTermsQuery(prop, terms) {
	const queryProp = {};
	queryProp[prop] = terms;
	return {terms: {...queryProp}};
}

function getTermsQueries(q) {
	const queries = [];

	for (const key in q) {
		if (isTermsObject(q[key])) {
			queries.push(getTermsQuery(key, q[key]));
		}
	}

	return queries;
}

function getQueryDSL(q) {
	/* eslint-disable camelcase */
	const must_not = [];

	for (const key in q) {
		if (q[key] === null) {
			must_not.push({exists: {field: key}});
		}
	}

	return {
		must: [...getRangeQueries(q), ...getTermsQueries(q)],
		must_not,
	};
	/* eslint-enable camelcase */
}

const DSL_BASE = {
	index: config.elastic.logIndex,
	size: config.searching.limits.pageSize,
	sort: [{'@timestamp': {order: 'desc'}}],
};

/**
 * Constructs Elasticsearch query DSL.
 *
 * `sort_index` prop should be match Elasticsearch's `search_after` prop.
 *
 * Objects with `gte` and `lte` property will be transformed into `range` queries.
 *
 * Arrays which completely consist of `String`s will be transformed into `terms` queries.
 *
 * Properites with `null` value will be transformsed into `must_not: exists: []` queries.
 *
 * @param {Object} q query paramaters
 * @returns Elasticsearch Query DSL object
 */
export default function queryConstructor(q) {
	/* eslint-disable camelcase */
	const queryDSL = {
		...DSL_BASE,
		query: {bool: {...getQueryDSL(q)}},
	};

	if (Array.isArray(q.sort_index)) {
		queryDSL.search_after = q.sort_index;
	}
	/* eslint-enable camelcase */

	return queryDSL;
}
