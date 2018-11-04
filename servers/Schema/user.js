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

module.exports = userSchema
