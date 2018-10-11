/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/10
 * Description: 路由文件
 */

const Router = require("koa-router")
const router = new Router

router.get("/", async (ctx, next) => {
  await ctx.render("index")
})

router.get("/login", async (ctx, next) => {
  await ctx.render("login")
})

router.post("/user/reg", async (ctx, next) => {
  console.log(ctx.request.body)
})


module.exports = router
