/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const { Schema } = require("../database/db.config")

const articleSchema = new Schema({
  title: String,
  content: String,
  author: String
}, {versionKey: false})

module.exports = articleSchema
