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
// app.use((req, res) => {
//   res.writeHead(200);
//   res.end('my koa')
// })

app.use(ctx => {
  ctx.body = 'my koa'
})

app.listen(3000, () => {
  console.log('监听端口3000');
})