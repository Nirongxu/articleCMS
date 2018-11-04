/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const articleSchema = require('../Schema/article')
const commentSchema = require('../Schema/comment')
const userSchema = require('../Schema/user')

// 通过 db 对象创建操作article数据库的模型对象
const Article = db.model('articles', articleSchema)
const Comment = db.model('comments', commentSchema)
const User = db.model('users', userSchema)

//  发布文章
exports.addArticle = async (ctx, next) => {
  if (ctx.session.isNew) {
    return ctx.body = {
      msg: '用户未登录',
      status: 0
    }
  }
  const data = ctx.request.body.articleData

  const deful = {
    author: ctx.session.uid,
    read: 0,
    comment: 0,
    praise: 0
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
  page--

  const maxNum = await Article.estimatedDocumentCount((err, num) => err ? console.log(err) : num)

  const artList = await Article.find()
    .sort('-created') // 以创建时间降序
    .skip(10 * page) // 跳过多少条
    .limit(10) // 每页条说
    .populate({
      path: 'author',
      select: 'username avatar'
    }) // mongoose 用于连表查询
    .then(data => data)
    .catch(err => console.log(err))

  await ctx.render('index', {
    session: ctx.session,
    title: '首页',
    artList,
    maxNum
  })
}

// 查看文章详情
exports.details = async ctx => {
  //  获取动态路由id
  const _id = ctx.params.id

  //  通过id查找对应文章内容
  const article = await Article
    .findById(_id)
    .populate('author', 'username')
    .then(data => data)

  //  查找当前文章的所有评论
  const comment = await Comment
    .find({article: _id})
    .sort('-created')
    .populate('author', 'username avatar')
    .then(data => data)
    .catch(err => {
      console.log(err)
    })

  await ctx.render('article', {
    title: article.title,
    article,
    comment,
    session: ctx.session
  })
}
