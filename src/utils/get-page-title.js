import defaultSettings from '@/settings'

const title = defaultSettings.title || '后台管理系统'
//设置页面title
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    // 路由title + 固定title
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
