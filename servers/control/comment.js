/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/31
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const commentSchema = require('../Schema/comment')
const articleSchema = require('../Schema/article')
const userSchema = require('../Schema/user')

// 通过 db 对象创建操作comments数据库的模型对象
const Comment = db.model('comments', commentSchema)
const Article = db.model('articles', articleSchema)
const User = db.model('users', userSchema)

//  保存评论
exports.addComment = async ctx => {
  console.log('保存评论'+ctx)
  let message = {
    status: 0,
    icon: 5,
    msg: '系统检测未登录，请先登录'
  }

  // 登录权限验证
  if (ctx.session.isNew) return ctx.body = message

  const data = ctx.request.body
  data.author = ctx.session.uid

  await new Comment(data)
    .save()
    .then(data => {
      message = {
        status: 1,
        icon: 6,
        msg: '评论成功'
      }
      // 更新文章计数器
      Article
        .updateOne({_id: data.article}, {$inc: {comment: 1}}, err => {
          if (err) console.log(err)
        })
      //  更新用户评论计数器
      User
        .updateOne({_id: data.author}, {$inc: {commentNum: 1}}, err => {
          if (err) console.log(err)
        })
    })
    .catch(err => {
      message = {
        status: 0,
        icon: 5,
        msg: err
      }
    })

  ctx.body = message
}

//  查询当前用户所有评论
exports.commentlist = async ctx => {
  if (ctx.session.isNew) {
    return ctx.body = {
      msg: '用户未登录',
      status: 0
    }
  }
  const uid = ctx.session.uid
  const data = await Comment.find({author: uid}).populate('article', 'title')
  ctx.body = data
}

//  删除当前用户对应评论
exports.delComment = async ctx => {
  //  评论 id
  const commentId = ctx.request.body.id
  const articleId = ctx.request.body.articleId
  console.log(ctx.request.body)
  const uid = ctx.session.uid

  //  删除评论
  await Comment.deleteOne({_id: commentId}, err => {
    if (err) return err
    ctx.body = {
      status: 1,
      msg: '删除成功'
    }
  })

  //  让文章的计数器 -1
  await Article.updateOne({_id: articleId}, {$inc: {comment: -1}})
  await User.updateOne({_id: uid}, {$inc: {commentNum: -1}})
}
