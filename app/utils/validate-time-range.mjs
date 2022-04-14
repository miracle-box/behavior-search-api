import config from '../../config/config.mjs';
import createHttpException from './create-http-exception.mjs';

export default function validateTimeRange(since, until) {
	const timeLimits = config.searching.limits.time;

	const now = Date.now();
	const sinceTime = new Date(since).getTime();
	const untilTime = new Date(until).getTime();

	// Since > Until
	if (sinceTime > untilTime) throw createHttpException(4021);

	// Less than x ms earlier thar now.
	if (untilTime > now - timeLimits.minTimeBefore)
		throw createHttpException(4022, timeLimits.minTimeBefore + 'ms');

	// More than x ms earlier than now.
	if (sinceTime < now - timeLimits.maxTimeBefore)
		throw createHttpException(4023, timeLimits.minTimeBefore + 'ms');

	// Range less than x ms.
	if (untilTime - sinceTime < timeLimits.minDuration)
		throw createHttpException(4024, timeLimits.minTimeBefore + 'ms');
}
