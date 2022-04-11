import config from '../../config/config.mjs';

export default function validateLocationRange(locLeast, locMost, mode) {
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

	const isXTooNarrow = locMost.x - locLeast.x < minRanges[0];
	const isYTooNarrow = locMost.y - locLeast.y < minRanges[1];
	const isZTooNarrow = locMost.z - locLeast.z < minRanges[2];

	const isXTooWide = locMost.x - locLeast.x > maxRanges[0];
	const isYTooWide = locMost.y - locLeast.y > maxRanges[1];
	const isZTooWide = locMost.z - locLeast.z > maxRanges[2];

	return !(isXTooNarrow || isYTooNarrow || isZTooNarrow || isXTooWide || isYTooWide || isZTooWide);
}
