/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/12
 * Description: 文件描述
 */

const { Schema } = require("../database/db.config")

const userSchema = new Schema({
  username: String,
  password: String
}, {versionKey: false})

module.exports = userSchema
