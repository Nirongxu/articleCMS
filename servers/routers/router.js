/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/10
 * Description: 路由文件
 */

const Router = require('koa-router')
const user = require('../control/user')
const article = require('../control/article')
const router = new Router()

router.get('/', user.keepLog, async (ctx, next) => {
  // console.log('ctx.session:' + ctx.session)
  await ctx.render('index', {
    session: ctx.session,
    title: '首页'
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '注册|登录'
  })
})

router.get('/404', async (ctx, next) => {
  await ctx.render('404', {
    title: 404
  })
})

// 注册接口
router.post('/user/reg', user.reg)

// 登录接口
router.post('/user/login', user.login)

// 退出接口
router.get('/user/logout', user.logout)

// 发表文章接口
router.post('/addArticle', article.addArticle)

module.exports = router
