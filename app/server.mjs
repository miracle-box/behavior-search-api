import Koa from 'koa';
import koaBody from 'koa-body';

import config from '../config/config.mjs';

import catchError from './middlewares/catch-error.mjs';
import logging from './middlewares/logging.mjs';

import routes from './routes/index.mjs';
import RequestException from './core/request-exception.mjs';

const app = new Koa();

app.use(logging);

app.use(catchError);

app.use(
	koaBody({
		onError(error) {
			throw new RequestException('Malformed request body: ' + error.message, 4000, 400);
		},
	}),
);

app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(config.server.port);
