/**
 * Created by WebStorm.
 * User: ni
 * Date: 2018/10/16
 * Description: 文件描述
 */
const {db} = require("../database/db.config")
const articleSchema = require("../Schema/article")

const Article = db.model("articles", articleSchema)
