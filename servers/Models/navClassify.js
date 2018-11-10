/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/11/5
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const navClassifySchema = require('../Schema/navClassify')

// 通过 db 对象创建操作 NavClassify 数据库的模型对象
const NavClassify = db.model('NavClassify', navClassifySchema)

module.exports = NavClassify
