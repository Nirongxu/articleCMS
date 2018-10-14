/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/10
 * Description: 项目入口文件
 */

const Koa = require("koa")
const static = require("koa-static")
const views = require("koa-views")
const router = require("./servers/routers/router")
const logger = require("koa-logger")
const body = require("koa-body")
const { join } = require("path")
const session = require("koa-session")

const app = new Koa

app.keys = ["session-defaultKey"]
// 配置session对象
const CONFIG = {
  key: "Sid",
  maxAge: 36e5,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true
}

// 注册日志模块
app.use(logger())

// 配置静态资源目录
app.use(static(join(__dirname, "static")))

// 配置模板引擎
app.use(views(join(__dirname, "views"),{
  extension: "pug"
}))

// 配置 koa-body 处理post请求
app.use(body())

// 注册session
app.use(session(CONFIG), app)



app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("项目启动成功")
})
