import Router from 'koa-router';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = {
    payload: 'service is up and running!',
  };
});

export default router;
