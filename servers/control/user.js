/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/12
 * Description: 注册登录
 */

const {db} = require("../database/db.config")
const userSchema = require("../Schema/user")
const encrypt = require("../util/encrypt")

const User = db.model("users", userSchema)

// 用户注册
exports.reg = async (ctx, next) => {
  const user = ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((resolve, reject) => {
    User.find({username}, (err, data) => {
      if (err) return reject(err)
      if (data.length !== 0) return resolve("用户名已存在")

      // 保存数据库之前先加密，使用自定义的加密模块 encrypt
      const user_db = new User({
        username,
        password: encrypt(password)
      })
      user_db.save((err, data) => {
        if (err) {
          return reject(err)
        } else {
          return resolve("1")
        }
      })
    })
  }).then(data => {
      ctx.body = {
        status: data
      }
  }).catch( err => {
    console.log(err);
    ctx.body = {
        status: "注册失败，请重试"
      }
    })
}

// 用户登录
exports.login = async (ctx, next) => {
  const user =ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((reslove, reject) => {
    User.find({username}, (err, data) => {
      if (err)return reject(err)
      if(data.length === 0) return reslove("用户名不存在")
      if(data[0].password === encrypt(password)) {
        debugger
        // 在浏览器 cookie 里设置 账号密码
        ctx.cookies.set("username", username, {
          domain: "localhost",
          path: "/",
          maxAge: 36e5,
          httpOnly: true, // true 不让客户端访问这个cookie
          overwrite: false,
          // signed: true
        })

        // 用户在数据库的_id
        ctx.cookies.set("uid", data[0]._id, {
          domain: "localhost",
          path: "/",
          maxAge: 36e5,
          httpOnly: true, // true 不让客户端访问这个cookie
          overwrite: false,
          // signed: true
        })

        // 服务端保存session
        ctx.session = {
          username,
          uid: data[0]._id
        }

        return reslove("1")
      }
      return  reslove("密码错误")
    })
  }).then( data => {
    ctx.body = {
      status: data
    }
  }).catch( msg => {
    console.log(msg);
    ctx.body = {
      status: "登录失败，请重试"
    }
  })
}

// 保持用户的状态
exports.keepLog = async (ctx, next) => {
  console.log("keepLog"+ctx.session.isNew);
  if (ctx.session.isNew){
    if (ctx.cookies.get("username")){
      ctx.session = {
        username: ctx.cookies.get("username"),
        uid: ctx.cookies.get("uid")
      }
    }
  }
  await next()
}

// 退出登录
exports.logout = async (ctx, next) => {
  ctx.session = null

  if (!ctx.session){
    console.log("退出"+ctx.session.isNew);
  }
  ctx.cookies.set("username", null, {
    maxAge: 0
  })
  ctx.cookies.set("uid", null, {
    maxAge: 0
  })

  // 重定向到首页
  ctx.redirect("/")

}
