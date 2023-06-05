const router = require("koa-router")();

router.get("/", async (ctx) => {
  ctx.body = "我是用户接口";
});

// 动态路由
router.get("/:id", async (ctx) => {
  ctx.body = `动态路由用户接口id：${ctx.params.id}`;
});

router.post("/", async (ctx) => {
  ctx.body = ctx.request.body;
});

router.put("/:id", async (ctx) => {
  ctx.body = `PUT: ${ctx.params.id}`;
});

router.del("/:id", async (ctx) => {
  ctx.body = `DEL: ${ctx.params.id}`;
});

module.exports = router;
