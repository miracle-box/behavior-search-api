import config from '../../config/config.mjs';

export default function validateTimeRange(since, until) {
	const now = Date.now();
	const sinceTime = new Date(since).getTime();
	const untilTime = new Date(until).getTime();

	// Since > Until
	const isRangeInvalid = sinceTime > untilTime;
	// Less than x ms earlier thar now.
	const isTooLate = untilTime > now - config.searching.limits.time.notLessThan;
	// More than x ms earlier than now.
	const isTooEarly = sinceTime < now - config.searching.limits.time.notMoreThan;
	// Range less than x ms.
	const isRangeToNarrow = untilTime - sinceTime < config.searching.limits.time.minDuration;

	return !(isRangeInvalid || isTooLate || isTooEarly || isRangeToNarrow);
}
