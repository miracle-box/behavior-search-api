import Router from '@koa/router';

import query from './query.mjs';

const router = new Router();

router.use(query.routes());

export default router;
