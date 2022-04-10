import Router from 'koa-router';

import elastic from '../utils/elastic.mjs';
import config from '../../config/config.mjs';

const router = new Router();

router.get('/query', async (ctx) => {
	const result = await elastic.search({
		index: config.elastic.logIndex,
		query: {},
	});
	ctx.body = result;
});

export default router;
