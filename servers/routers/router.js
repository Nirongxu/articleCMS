/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/10
 * Description: 路由文件
 */

const Router = require("koa-router")
const user = require("../control/user")
const router = new Router

router.get("/", user.keepLog, async (ctx, next) => {
  await ctx.render("index", {
    fileTitle: true,
    user: true
  })
})

router.get("/login", async (ctx, next) => {
  await ctx.render("login", {
    fileTitle: "注册|登录"
  })
})

// 注册
router.post("/user/reg", user.reg)

// 登录
router.post("/user/login", user.login)

router.get("/404", async (ctx, next) => {
  await ctx.render("404", {
    fileTitle: true,
    user: true
  })
})

module.exports = router
