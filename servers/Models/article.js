/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/11/5
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const articleSchema = require('../Schema/article')

// 通过 db 对象创建操作article数据库的模型对象
const Article = db.model('articles', articleSchema)

module.exports = Article
