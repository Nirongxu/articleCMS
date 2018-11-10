/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const { Schema } = require('../database/db.config')

const navClassifySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  href: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created'
  }
})

module.exports = navClassifySchema
