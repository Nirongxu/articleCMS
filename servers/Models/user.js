/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/11/5
 * Description: 文件描述
 */
const {db} = require('../database/db.config')
const userSchema = require('../Schema/user')

// 通过 db 对象创建操作article数据库的模型对象
const User = db.model('users', userSchema)

module.exports = User
