/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/10
 * Description: 路由文件
 */

const Router = require('koa-router')
const user = require('../control/user')
const article = require('../control/article')
const comment = require('../control/comment')
const upload = require('../util/upload')

const router = new Router()

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '注册|登录'
  })
})

router.get('/', user.keepLog, article.getList)

// 查询文章列表
router.get('/page/:id', user.keepLog, article.getList)

// 文章详情页
router.get('/article/:id', article.details)

// 注册接口
router.post('/user/reg', user.reg)

// 登录接口
router.post('/user/login', user.login)

// 退出接口
router.get('/user/logout', user.logout)

// 发表文章接口
router.post('/addArticle', article.addArticle)

//  发表评论接口
router.post('/comment', user.keepLog, comment.addComment)

//  头像上传
router.post('/upload', user.keepLog, upload.single('file'), user.upload)

//  获取用户所有评论
router.get('/user/comments', user.keepLog, comment.commentlist)

//  删除评论
router.post('/delComment', user.keepLog, comment.delComment)

router.get('*', async (ctx, next) => {
  await ctx.render('404', {
    title: 404
  })
})

module.exports = router
