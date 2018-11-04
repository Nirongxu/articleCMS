/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/11/1
 * Description: 文件描述
 */
const multer = require('koa-multer')
const {join} = require('path')

const storage = multer.diskStorage({
  //  存储位置
  destination: join(__dirname, '../../static/public/avatar'),

  //  文件名
  filename (req, file, cb) {
    const filename = file.originalname.split('.')
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
  }
})

module.exports = multer({storage})
