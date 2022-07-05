import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中不会重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            如果设置为false，则项目将隐藏在面包屑中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，边栏将突出显示您设置的路径
  }
 */
// const sessionRouter = sessionStorage.getItem('router')
/**
 * constantRoutes
 * 基础路由
 * 无权限控制
 */
// const initRouter = [
  export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path:'/black',
    component:()=>import('@/views/Black.vue'),
    hidden: true
  }
]
// export const constantRoutes = sessionRouter || initRouter
// export const constantRoutes = initRouter
/**
 * dynamicRoutes
 * 动态路由
 * 权限控制
 */
export const dynamicRoutes = [
  {
    name:'Product',
    path: '/product',
    component: Layout,
    redirect: '/product/tradeMark',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [{
      name:'TradeMark',
      path: 'tradeMark', 
      component: ()=>import('@/views/product/TradeMark'),
      meta: { title: '品牌管理'}
    }]
  }
]

// 404 页面
export const errRouter = [
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置 router
}

export default router
