/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const Article = require('../Models/article')
const Comment = require('../Models/comment')
const User = require('../Models/user')
const NavClassify = require('../Models/NavClassify')

//  获取导航分类
exports.getNavClassify = async ctx => {
  const navList = await NavClassify.find()
    .then(data => data)
    .catch(err => console.log(err))
  ctx.body = {
    navList
  }
}

//  修改导航分类
exports.setNavClassify = async (ctx, next) => {
  if (ctx.session.isNew) {
    ctx.body = {
      msg: '用户未登录',
      status: 0
    }
    return false
  }
  const data = ctx.request.body.navClassifyData
  await NavClassify.remove()
  let res = {
    msg: '修改成功',
    status: 1
  }
  data.forEach((item, val) => {
    new NavClassify(item).save((err, data) => {
      if (err) {
        res = {
          msg: '修改失败',
          status: 0
        }
        return console.log(err)
      }
    })
  })
  ctx.body = res
}
//  发布文章
exports.addArticle = async (ctx, next) => {
  if (ctx.session.isNew) {
    return ctx.body = {
      msg: '用户未登录',
      status: 0
    }
  }
  const data = ctx.request.body.articleData
  if (data._id) {
    await Article.findByIdAndUpdate(data._id, data, err => {
      if (err) return console.log(err)
    })
    ctx.body = {
      msg: '修改成功',
      status: 1
    }
    return false
  }
  const deful = {
    author: ctx.session.uid,
    readNum: 0,
    commentNum: 0,
    praiseNum: 0
  }
  Object.assign(data, deful)

  await new Promise((resolve, reject) => {
    new Article(data).save((err, data) => {
      if (err) return reject(err)

      //  更新用户文章计数器
      User.updateOne({_id: data.author}, {$inc: {articleNum: 1}}, err => {
        if (err) return console.log(err)
      })
      resolve(data)
    })
  }).then(data => {
    ctx.body = {
      msg: '发表成功',
      status: 1
    }
  }).catch(err => {
    ctx.body = {
      msg: '发表失败',
      status: 0
    }
  })
}

// 获取文章列表
exports.getList = async ctx => {
  global.uid = ctx.session.uid
  let page = ctx.params.id || 1
  let nav = ctx.params.fenlei

  page--

  let maxNum, artList, navList, readList, commentList
  async function select ({tag = {}} = {}) {
    //  获取总条数

    maxNum = await Article.find(tag).exec()
    maxNum = maxNum.length
    artList = await Article.find(tag)
      .sort('-created') // 以创建时间降序
      .skip(10 * page) // 跳过多少条
      .limit(10) // 每页条数
      .populate({
        path: 'author',
        select: 'username avatar'
      }) // mongoose 用于连表查询
      .then(data => data)
      .catch(err => console.log(err))

    readList = await Article.find(tag)
      .sort('-readNum') // 以阅读数量降序
      .limit(5) // 每页条数
      .then(data => data)
      .catch(err => console.log(err))

    commentList = await Article.find(tag)
      .sort('-commentNun') // 以阅读数量降序
      .limit(5) // 每页条数
      .then(data => data)
      .catch(err => console.log(err))

    navList = await NavClassify.find()
      .then(data => data)
      .catch(err => console.log(err))
  }
  await select(nav ? {tag: {tag: {$elemMatch: {$eq: nav}}}} : nav)
  await ctx.render('index', {
    session: ctx.session,
    title: '首页',
    artList,
    maxNum,
    navList,
    nav,
    readList,
    commentList
  })
}

// 查看文章详情
exports.details = async ctx => {
  //  获取动态路由id
  const _id = ctx.params.id.split('&')[0]
  const edit = ctx.params.id.split('&')[1]

  //  阅读数 +1
  Article.updateOne({_id: _id}, {$inc: {readNum: 1}}, err => {
    if (err) return console.log(err)
  })

  //  通过id查找对应文章内容
  const article = await Article
    .findById(_id)
    .populate('author', 'username')
    .then(data => data)
  if (edit) {
    ctx.body = article
    return false
  }
  //  查找当前文章的所有评论
  const comment = await Comment
    .find({article: _id})
    .sort('-created')
    .populate('author', 'username avatar')
    .then(data => data)
    .catch(err => {
      console.log(err)
    })

  //  获取侧边文章阅读列表
  const readList = await Article.find()
    .sort('-readNum') // 以阅读数量降序
    .limit(5) // 每页条数
    .then(data => data)
    .catch(err => console.log(err))

  //  获取侧边文章评论列表
  const commentList = await Article.find()
    .sort('-commentNun') // 以阅读数量降序
    .limit(5) // 每页条数
    .then(data => data)
    .catch(err => console.log(err))

  const navList = await NavClassify.find()
    .then(data => data)
    .catch(err => console.log(err))

  await ctx.render('article', {
    title: article.title,
    article,
    comment,
    navList,
    session: ctx.session,
    readList,
    commentList
  })
}

//  查找当前用户所有的文章列表
exports.articleList = async ctx => {
  if (ctx.session.isNew) {
    ctx.body = {
      msg: '用户未登录',
      status: 0
    }
    return false
  }
  const uid = ctx.session.uid
  ctx.body = await Article.find({author: uid})
}

//  删除当前用户对应文章
exports.delArticle = async ctx => {
  //  文章 id
  const articleId = ctx.request.body.id

  let res = {
    status: 1,
    msg: '删除成功'
  }
  //  删除文章
  await Article.findById(articleId)
    .then(data => data.remove())
    .catch(err => {
      console.log(err)
      res = {
        status: 0,
        msg: err
      }
    })

  ctx.body = res
}

//  文章点赞
exports.setpraiseNum = ctx => {
  const id = ctx.request.body.articleId
  //  点赞数 +1
  Article.updateOne({_id: id}, {$inc: {praiseNum: 1}}, err => {
    if (err) return console.log(err)
  })
  ctx.body = {
    status: 1,
    msg: '点赞+1'
  }
}
