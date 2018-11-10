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
var cors = require('koa2-cors');

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

// 注册session
app.use(session(CONFIG, app))

app.use(cors())
// 注册日志模块
// app.use(logger())

// 配置静态资源目录
app.use(static(join(__dirname, "static")))

// 配置模板引擎
app.use(views(join(__dirname, "views"),{
  extension: "pug"
}))

// 配置 koa-body 处理post请求
app.use(body())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("项目启动成功")
})

{
  // 系统自动生成管理员
  const encrypt = require('./servers/util/encrypt')
  const User = require('./servers/Models/user')
  const navClassify = require('./servers/Models/navClassify')

  User.find({username: "admin"})
    .then(data => {
      if (data.length === 0){
        new User({
          username: "admin",
          password: encrypt("admin"),
          role: 0,
          articleNum: 0,
          commentNum: 0
        })
          .save()
          .then(data => {
            console.log(`管理员账号检查：
            系统生成默认管理员:用户名 -> admin, 密码 -> admin`)
          })
          .catch(err => {
            console.log("管理员账号检查失败")
          })
      } else {
        console.log(`管理员账号检查：
        系统检查到已存在默认管理员:用户名 -> admin, 密码 -> admin`)
      }
    })

  // 系统自动创建分类
  navClassify.find()
    .then(data => {
      if (data.length < 1) {
        new navClassify({
          name: "全部",
          href: "/index"
        })
          .save()
          .then(data => {
            console.log(`默认分类检查：
            系统生成默认分类: "全部"`)
          })
          .catch(err => {
            console.log("默认分类检查失败")
          })
      } else {
        console.log(`默认分类检查：
              系统检查到已存在默认分类: "全部"`)
      }
    })
}
