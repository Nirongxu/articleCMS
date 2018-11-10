import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/Home.vue'
import HomeMain from '@/views/mainIndex.vue'
import NotFound from '@/page404.vue'
import AddArticle from '@/views/article/addArticle.vue'
import ArticleList from '@/views/article/articleList.vue'
import Comment from '@/views/comment/comment.vue'
import User from '@/views/user/userList.vue'
import Upload from '@/views/upload/upload.vue'
import NavClassify from '@/views/syssetting/navClassify.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: '/index',
      hidden: true,
      children: []
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true,
      children: []
    },
    {
      path: '/index',
      iconCls: 'fa fa-dashboard', // 图标样式class
      name: '首页',
      component: Home,
      alone: true,
      children: [
        {
          path: '/index',
          iconCls: 'fa fa-dashboard', // 图标样式class
          name: '首页',
          component: HomeMain,
          children: []
        }
      ]
    },
    {
      path: '/',
      iconCls: 'el-icon-document', // 图标样式class
      name: '文章管理',
      component: Home,
      children: [
        {
          path: '/addArticle',
          iconCls: 'el-icon-edit-outline', // 图标样式class
          name: '发表文章',
          component: AddArticle,
          children: []
        },
        {
          path: '/articleList',
          iconCls: 'fa fa-list-ol', // 图标样式class
          name: '文章列表',
          component: ArticleList,
          children: []
        }
      ]
    },
    {
      path: '/',
      iconCls: 'fa fa-comments-o', // 图标样式class
      name: '评论管理',
      component: Home,
      children: [
        {
          path: '/comment',
          iconCls: 'fa fa-commenting-o', // 图标样式class
          name: '评论列表',
          component: Comment,
          children: []
        }
      ]
    },
    {
      path: '/',
      iconCls: 'fa fa-users', // 图标样式class
      name: '用户管理',
      component: Home,
      children: [
        {
          path: '/userList',
          iconCls: 'fa fa-address-book-o', // 图标样式class
          name: '用户列表',
          component: User,
          children: []
        },
        {
          path: '/userAvatarUpload',
          iconCls: 'fa fa-address-card-o', // 图标样式class
          name: '头像上传',
          component: Upload,
          children: []
        }
      ]
    },
    {
      path: '/',
      iconCls: 'el-icon-setting', // 图标样式class
      name: '系统设置',
      component: Home,
      children: [
        {
          path: '/navClassifies',
          iconCls: 'el-icon-menu', // 图标样式class
          name: '导航菜单',
          component: NavClassify,
          children: []
        }
      ]
    },
    {
      path: '/*',
      component: NotFound,
      name: '',
      hidden: true,
      children: []
    }
  ]
})
