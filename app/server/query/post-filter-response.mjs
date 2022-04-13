import config from '../../../config/config.mjs';

function getRandNumber() {
	const min = config.searching.desensitizing.locations.minRandom;
	const max = config.searching.desensitizing.locations.maxRandom;

	return Number.parseInt(Math.random() * (max - min + 1) + min, 10);
}

export default function postFilterResponse(r) {
	/* eslint-disable camelcase */
	const response = {
		code: 2000,
		time_elapsed: r.took,
		sort_index: r.hits.hits[r.hits.hits.length - 1].sort,
		hits: {
			total: r.total,
			hits: [],
		},
	};

	for (const element of r.hits.hits) {
		const data = {...element._source};
		data._id = element._id;

		if (
			Object.prototype.hasOwnProperty.call(data, 'locations.subject') &&
			data['locations.subject'].x !== null
		) {
			for (const k in data['locations.subject']) {
				if (Object.hasOwnProperty.call(data['locations.subject'], k)) {
					const loc = data['locations.subject'][k];
					data['locations.subject'][k] = loc + getRandNumber();
				}
			}
		}

		if (
			Object.prototype.hasOwnProperty.call(data, 'locations.object') &&
			data['locations.object'].x !== null
		) {
			for (const k in data['locations.object']) {
				if (Object.hasOwnProperty.call(data['locations.object'], k)) {
					const loc = data['locations.object'][k];
					data['locations.object'][k] = loc + getRandNumber();
				}
			}
		}

		response.hits.hits.push(data);
	}

	return response;
	/* eslint-enable camelcase */
}
