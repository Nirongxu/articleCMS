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

module.exports = commentSchema
