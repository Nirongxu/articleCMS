/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/31
 * Description: 文件描述
 */
const Comment = require('../Models/comment')
const Article = require('../Models/article')
const User = require('../Models/user')

//  保存评论
exports.addComment = async ctx => {
  console.log('保存评论' + ctx)
  let message = {
    status: 0,
    icon: 5,
    msg: '系统检测未登录，请先登录'
  }

  // 登录权限验证
  if (ctx.session.isNew) return ctx.body = message

  const data = ctx.request.body
  data.author = ctx.session.uid

  await new Comment(data).save()
    .then(data => {
      message = {
        status: 1,
        icon: 6,
        msg: '评论成功'
      }
      // 更新文章计数器
      Article
        .updateOne({_id: data.article}, {$inc: {commentNum: 1}}, err => {
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

//  回复评论
exports.replyComment = async ctx => {
  // console.log('回复评论' +  JSON.stringify(ctx))
  let message = {
    status: 0,
    icon: 5,
    msg: '系统检测未登录，请先登录'
  }

  // 登录权限验证
  if (ctx.session.isNew) return ctx.body = message

  const data = ctx.request.body

  let reply = {}
  reply.content = data.content
  reply.author = ctx.session

  reply.author = {
    username: ctx.session.username,
    uid: ctx.session.uid,
    avatar: ctx.session.avatar
  }
  // reply.cretime = await new Date()
  // find({
  //   doctorid:1
  // },function(info,error){
  //   if(error) console.log(error);
  //   var old_morning=info.taday.data.morning;
  //   var insert={
  //
  //     number:1,
  //     patient:'xiaoming'
  //   };
  //   old_morning.push(insert);
  //   info.today.data.morning=old_morning;
  //   info.save();
  // });

  await Comment.findById(data.commentId, function (err, res) {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
      var resReply = res.reply
      resReply.push(reply)
      res.reply = resReply
      res.save()
      message = {
        status: 1,
        icon: 6,
        msg: '回复成功'
      }
      // 更新文章计数器
      Article.updateOne({_id: data.article}, {$inc: {commentNum: 1}}, err => {
        if (err) console.log(err)
      })
      //  更新用户评论计数器
      User.updateOne({_id: data.author}, {$inc: {commentNum: 1}}, err => {
        if (err) console.log(err)
      })

    }
  })

  ctx.body = message
}

//  查询当前用户所有评论
exports.commentList = async ctx => {
  if (ctx.session.isNew) {
    ctx.body = {
      msg: '用户未登录',
      status: 0
    }
    return false
  }
  const uid = ctx.session.uid
  const data = await Comment.find({author: uid}).populate('article', 'title')
  ctx.body = data
}

//  删除当前用户对应评论
exports.delComment = async ctx => {
  //  评论 id
  const commentId = ctx.request.body.id

  let res = {
    status: 1,
    msg: '删除成功'
  }
  //  删除评论
  await Comment.findById(commentId)
    .then(data => data.remove())
    .catch(err => {
      debugger
      res = {
        status: 0,
        msg: err
      }
    })

  ctx.body = res
}
