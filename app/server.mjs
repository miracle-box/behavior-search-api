import Koa from 'koa';

import config from '../config/config.mjs';
import routes from './routes/index.mjs';

const app = new Koa();

// Logging
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${new Date().toISOString()} ${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.server.port);
