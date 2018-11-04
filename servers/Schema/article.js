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
  read: Number,
  comment: Number,
  praise: Number

}, {
  versionKey: false,
  timestamps: {
    createdAt: "created"
  }
})

module.exports = articleSchema
