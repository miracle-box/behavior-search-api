import Koa from 'koa';
import koaBody from 'koa-body';

import config from '../config/config.mjs';

import catchError from './middlewares/catch-error.mjs';
import logging from './middlewares/logging.mjs';

import routes from './routes/index.mjs';
import createHttpException from './utils/create-http-exception.mjs';

const app = new Koa();

app.use(logging);

app.use(catchError);

app.use(
	koaBody({
		onError(error) {
			throw createHttpException(4000, error.message);
		},
	}),
);

app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(config.server.port);
