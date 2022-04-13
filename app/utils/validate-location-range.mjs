import config from '../../config/config.mjs';

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

	const isXTooNarrow = lte[0] - gte[0] < minRanges[0];
	const isYTooNarrow = lte[1] - gte[1] < minRanges[1];
	const isZTooNarrow = lte[2] - gte[2] < minRanges[2];

	const isXTooWide = lte[0] - gte[0] > maxRanges[0];
	const isYTooWide = lte[1] - gte[1] > maxRanges[1];
	const isZTooWide = lte[2] - gte[2] > maxRanges[2];

	return !(isXTooNarrow || isYTooNarrow || isZTooNarrow || isXTooWide || isYTooWide || isZTooWide);
}
