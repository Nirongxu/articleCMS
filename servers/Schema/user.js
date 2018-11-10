/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/12
 * Description: 文件描述
 */

const { Schema } = require("../database/db.config")

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 1
  },
  avatar: {
    type: String,
    default: '/public/avatar/icon.jpg'
  },
  articleNum: Number,
  commentNum: Number
}, {versionKey: false})

userSchema.post('remove', doc => {
  const Article = require('../Models/article')
  const Comment = require('../Models/comment')
  const {_id} = doc
  console.log(doc)

  //  删除当前用户所关联的所有文章,分别执行各自的删除文章的remov方法，触发钩子
  Article.find({author: _id})
    .then(data => {
      data.forEach(v => v.remove())
    })
  //  删除当前用户所关联的所有评论数,分别执行各自的删除评论的remov方法，触发钩子
  Comment.find({author: _id})
    .then(data => {
      data.forEach(v => v.remove())
    })
})

module.exports = userSchema
