/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const articleSchema = require('../Schema/article')

// 通过 db 对象创建操作article数据库的模型对象
const Article = db.model('articles', articleSchema)


exports.addArticle = async (ctx, next) => {
  ctx.res.setHeader("Access-Control-Allow-Origin","*")
  const data = ctx.request.body
  console.log(data)
}

