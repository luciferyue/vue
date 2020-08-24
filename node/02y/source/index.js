// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('hi,koa');
// })

// server.listen(3000, () => {
//   console.log('监听端口3000');
// })

const KOY = require('./koy');
const app = new KOY();

const Router = require('./router')
const router = new Router()

router.get('/index', async ctx => { console.log(ctx); ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());
// app.use((req, res) => {
//   res.writeHead(200);
//   res.end('my koa')
// })

// app.use(ctx => {
//   ctx.body = 'my koa'
// })

// const delay = () => new Promise(resolve => setTimeout(() => resolve(), 10));
// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

app.listen(3000, () => {
  console.log('监听端口3000');
})