import config from '../../config/config.mjs';
import createHttpException from './create-http-exception.mjs';

/**
 * Validates whether the location range is valid.
 * @param {Number[]} gte the smaller numbers of the location
 * @param {Number} lte the bigger numbers of the location
 * @param {String} mode `subject` or `object`
 */
export default function validateLocationRange(gte, lte, mode) {
	let minRanges = [0, 0, 0];
	let maxRanges = [0, 0, 0];

	if (mode === 'subject') {
		minRanges = config.searching.limits.locations.subject.minRanges;
		maxRanges = config.searching.limits.locations.subject.maxRanges;
	}

	if (mode === 'object') {
		minRanges = config.searching.limits.locations.object.minRanges;
		maxRanges = config.searching.limits.locations.object.maxRanges;
	}

	// X/Y/Z axis too narrow
	if (lte[0] - gte[0] < minRanges[0]) throw createHttpException(4031, `${mode} x axis`);
	if (lte[1] - gte[1] < minRanges[1]) throw createHttpException(4032, `${mode} y axis`);
	if (lte[2] - gte[2] < minRanges[2]) throw createHttpException(4033, `${mode} z axis`);

	// X/Y/Z axis too wide
	if (lte[0] - gte[0] > maxRanges[0]) throw createHttpException(4034, `${mode} x axis`);
	if (lte[1] - gte[1] > maxRanges[1]) throw createHttpException(4035, `${mode} y axis`);
	if (lte[2] - gte[2] > maxRanges[2]) throw createHttpException(4036, `${mode} z axis`);
}
