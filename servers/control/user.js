/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/12
 * Description: 注册登录
 */
const User = require('../Models/user')
const Article = require('../Models/article')
const encrypt = require('../util/encrypt')

// 用户注册
exports.reg = async (ctx, next) => {
  const user = ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((resolve, reject) => {
    User.find({username}, (err, data) => {
      if (err) return reject(err)
      if (data.length !== 0) return resolve('用户名已存在')

      // 保存数据库之前先加密，使用自定义的加密模块 encrypt
      const user_db = new User({
        username,
        password: encrypt(password),
        articleNum: 0,
        commentNum: 0
      })
      user_db.save((err, data) => {
        if (err) {
          return reject(err)
        } else {
          return resolve('1')
        }
      })
    })
  }).then(data => {
    ctx.body = {
      status: data
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      status: '注册失败，请重试'
    }
  })
}

// 用户登录
exports.login = async (ctx, next) => {
  const user = ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((resolve, reject) => {
    User.find({username}, (err, data) => {
      if (err) return reject(err)
      if (data.length === 0) return resolve('用户名不存在')
      if (data[0].password === encrypt(password)) {
        // 在浏览器 cookie 里设置 账号密码
        ctx.cookies.set('username', username, {
          domain: 'localhost',
          path: '/',
          maxAge: 36e5,
          httpOnly: true, // true 不让客户端访问这个cookie
          overwrite: false
          // signed: true
        })

        // 用户在数据库的_id
        ctx.cookies.set('uid', data[0]._id, {
          domain: 'localhost',
          path: '/',
          maxAge: 36e5,
          httpOnly: true, // true 不让客户端访问这个cookie
          overwrite: false
          // signed: true
        })

        // 服务端保存session
        ctx.session = {
          username,
          uid: data[0]._id,
          avatar: data[0].avatar
        }

        return resolve('1')
      }
      return resolve('密码错误')
    })
  }).then(data => {
    ctx.body = {
      status: data
    }
  }).catch(msg => {
    console.log(msg)
    ctx.body = {
      status: '登录失败，请重试'
    }
  })
}

// 保持用户的状态
exports.keepLog = async (ctx, next) => {
  // console.log('keepLog' + ctx.session.isNew)
  if (ctx.session.isNew) {
    if (ctx.cookies.get('username')) {
      ctx.session = {
        username: ctx.cookies.get('username'),
        uid: ctx.cookies.get('uid')
      }
    }
  }
  await next()
}

// 退出登录
exports.logout = async (ctx, next) => {
  ctx.session = null

  ctx.cookies.set('username', null, {
    maxAge: 0
  })
  ctx.cookies.set('uid', null, {
    maxAge: 0
  })

  // 重定向到首页
  ctx.redirect('/')
}

//  用户的头像上传
exports.upload = async ctx => {
  const filename = ctx.req.file.filename
  console.log(filename)
  let data = {}
  await User.updateMany({_id: global.uid}, {$set: {avatar: '/public/avatar/' + filename}}, (err, res) => {
    // console.log(ctx)
    // console.log(User.find({_id: ctx.session.uid}))
    if (err) {
      data = {
        status: 0,
        msg: '上传失败'
      }
    } else {
      data = {
        status: 1,
        msg: '上传成功'
      }
    }
  })

  ctx.body = data
}

//  获取用户列表
exports.userList = async ctx => {
  if (ctx.session.isNew) {
    ctx.body = {
      msg: '用户未登录',
      status: 0
    }
    return false
  }
  const data = await User.find().exec()
  ctx.body = data
}

//  删除用户
exports.delUser = async ctx => {
  //  评论 id
  const uid = ctx.request.body.id
  const _id = global.uid
  let res = {
    status: 1,
    msg: '删除成功'
  }
  await User.findById(_id)
    .then(async data => {
      console.log(uid === _id)
      if (uid === _id || data.role === 0) {
        res = {
          status: 0,
          msg: '删除失败:你未获得此权限'
        }
      } else {
        //  删除用户
        await User.findById(uid)
          .then(data => {
            data.remove()
          })
          .catch(err => {
            res = {
              status: 0,
              msg: err
            }
          })
      }
    })
    .catch(err => {
      ctx.body = {
        status: 0,
        msg: err
      }
    })
  ctx.body = res
}
