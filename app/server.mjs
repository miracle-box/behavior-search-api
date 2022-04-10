import Koa from 'koa';
import koaBody from 'koa-body';

import config from '../config/config.mjs';
import routes from './routes/index.mjs';
import logging from './middlewares/logging.mjs';

const app = new Koa();

app.use(logging);

app.use(koaBody());

app.use(routes.routes(), routes.allowedMethods());

app.listen(config.server.port);
