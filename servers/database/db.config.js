/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/11
 * Description: 文件描述
 */

// 连接数据库导出 db和Schema
const mongoose = require("mongoose")
const db = mongoose.createConnection("mongodb://localhost:27017/xuCMS", {useNewUrlParser: true})

// 用原生 ES6的promise代替mongoose自实现的promise
mongoose.Promise = global.Promise

// 把 mongoose 的schema 提取出来
const Schema = mongoose.Schema

db.on("error", () => {
  console.log("连接数据库失败")
})

db.on("open", () => {
  console.log("xuCMS 数据库连接成功")
})

module.exports = {
  db,
  Schema
}
