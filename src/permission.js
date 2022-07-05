import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { constantRoutes, dynamicRoutes,errRouter,resetRouter } from '@/router'

NProgress.configure({ showSpinner: false }) // 页面进度条配置,禁用 进度环

const whiteList = ['/login'] // no 重定向 白名单

router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置页面标题title
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录,获取token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 如果有用户信息，放行
        next()
      } else {
        try {
          // get user info
          store.dispatch('user/getInfo').then(()=>{
            //通过中转空白页解决刷新后404
            next({
              path:'/black',
              query:{path:to.path}
            })
          })
          
        } catch (error) {
          // 删除token并转到登录页面以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '登录错误！')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 后置路由钩子，完成进度条
  NProgress.done()
})
