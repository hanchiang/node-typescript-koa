import Koa from 'koa';
import koaBody from 'koa-body';

import { logger as koaWinston } from 'koa2-winston';
import logger, { winstonOptions } from './utils/logger';

import config from './config';
import MyRoutes from './routes';
import * as middlewares from './middlewares';

const app = new Koa();

if (config.nodeEnv !== 'test') {
  app.use(koaWinston(winstonOptions));
}

app.keys = [config.cookieSecret];

app.use(middlewares.catchAndPropagateError);
app.use(koaBody());

logger.info('woo')
logger.error('oops')

app.use(MyRoutes.routes());

app.use(middlewares.notFound);

// app level error handler
app.on('error', (err, ctx) => {
  if (config.nodeEnv !== 'test') {
    if (ctx.status >= 500) {
      logger.error(err.devMessage || err.message);
    } else if (ctx.status >= 400) {
      logger.error(err.devMessage || err.message);
    }
  }
});

export default app;
