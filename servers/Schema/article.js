/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const { Schema } = require('../database/db.config')

const Objectid = Schema.Types.ObjectId

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  tag: Array,
  top: Boolean,
  content: {
    markdown: String,
    html: String,
    text: String
  },
  author: {
    type: Objectid,
    ref: "users"
  }, // 关联 users表
  readNum: Number,
  commentNum: Number,
  praiseNum: Number

}, {
  versionKey: false,
  timestamps: {
    createdAt: "created"
  }
})

articleSchema.post('remove', doc => {
  const Comment = require('../Models/comment')
  const User = require('../Models/user')
  const {author, _id} = doc
  console.log(doc)
  //  当前被删除文章的作者的文章数 -1
  User.updateOne({_id: author}, {$inc: {articleNum: -1}}).exec()

  //  删除当前文章所关联的所有评论数,分别执行各自的删除评论的remov方法，触发钩子
  Comment.find({article: _id})
    .then(data => {
      data.forEach(v => v.remove())
    })
})

module.exports = articleSchema
