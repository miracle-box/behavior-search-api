import Router from '@koa/router';

import postQuery from '../server/query/post.mjs';

const router = new Router();

router.post('/query', postQuery);

export default router;
