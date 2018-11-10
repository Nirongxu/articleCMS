/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/31
 * Description: 文件描述
 */
const { Schema } = require('../database/db.config')

const Objectid = Schema.Types.ObjectId

const commentSchema = new Schema({
  content: {
    html: String,
    text: String
  },
  author: {
    type: Objectid,
    ref: 'users'
  }, // 关联 users表
  article: {
    type: Objectid,
    ref: 'articles'
  },
  reply: {
    content: String,
    author: {
      type: Objectid,
      ref: 'users'
    }
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created'
  }
})

//  mongoose 删除评论的钩子函数
commentSchema.post('remove', doc => {
  const Article = require('../Models/article')
  const User = require('../Models/user')
  const {author, article} = doc

  //  对应文章的评论数 -1
  Article.updateOne({_id: article}, {$inc: {commentNum: -1}}).exec()

  //  当前被删除评论的作者的评论数 -1
  User.updateOne({_id: author}, {$inc: {commentNum: -1}}).exec()
})

module.exports = commentSchema
