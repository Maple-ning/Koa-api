const Koa = require('koa');

const app = new Koa();
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');

const responseFormatter = require('./middleware/response_formatter');
const { apiPrefix } = require('./config/index');
const routers = require('./routers/index');

// koa的错误处理程序hack
onerror(app);

// 引入中间件
app.use(json());
app.use(logger());
app.use(responseFormatter(apiPrefix));
app.use(routers.routes()).use(routers.allowedMethods());

// 监听error
app.on('error', (err, ctx) => {
  // 在这里可以对错误信息进行一些处理，生成日志等。
  console.error('server error', err, ctx);
});

app.listen(3000);
