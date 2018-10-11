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


const app = new Koa

app.use(logger())

app.use(static(join(__dirname, "static")))

app.use(views(join(__dirname, "views"),{
  extension: "pug"
}))

// 配置 koa-body 处理post请求
app.use(body())



app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("项目启动成功")
})
