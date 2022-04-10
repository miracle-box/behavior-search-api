import Router from '@koa/router';

import validateTimeRange from '../utils/validate-time-range.mjs';

const router = new Router();

router.post('/query', async (ctx) => {
	const body = ctx.request.body;

	ctx.body = {
		isTimeValid: validateTimeRange(body.timestamp.since, body.timestamp.until),
	};
});

export default router;
