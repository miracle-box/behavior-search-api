export default function validateTimeRange(since, until) {
	const now = Date.now();
	const sinceTime = new Date(since).getTime();
	const untilTime = new Date(until).getTime();

	// Since > Until
	const isRangeInvalid = sinceTime > untilTime;
	// Less than 1 hour from now.
	const isTooLate = untilTime > now - 3_600_000;
	// More than 3 days from now.
	const isTooEarly = sinceTime < now - 259_200_000;
	// Range less than 20 minutes.
	const isRangeToNarrow = untilTime - sinceTime < 1_200_000;

	return !(isRangeInvalid || isTooLate || isTooEarly || isRangeToNarrow);
}
