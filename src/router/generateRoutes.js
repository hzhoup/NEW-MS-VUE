import BasicLayout from '@/layouts/BasicLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import PageView from '@/layouts/PageView.vue'

const pages = import.meta.glob('../views/**/*.vue')

export const generateRoutes = (menus) => {
  const routes = []
  const firstRouter = {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '首页', icon: 'desktop', keepAlive: true }
      }
    ]
  }
  const menuMap = {}

  for (const menu of menus) {
    menuMap[menu.id] = {
      path: menu.url,
      name: menu.url,
      meta: { title: menu.name, icon: menu.icon }
    }
    if (menuMap[menu.parentId]) {
      if (menu.type === 0) {
        menuMap[menu.id]['component'] = BlankLayout
      } else {
        menuMap[menu.id]['component'] = pages[`../views${menu.url}.vue`]
      }
      if (typeof menuMap[menu.parentId].redirect === 'undefined') {
        menuMap[menu.parentId].redirect = menu.url
        menuMap[menu.parentId].children = []
      }
      menuMap[menu.parentId].children.push(menuMap[menu.id])
    } else {
      menuMap[menu.id]['component'] = PageView
      firstRouter.children.push(menuMap[menu.id])
      if (firstRouter.redirect === 'undefined') {
        firstRouter.redirect = menu.url
      }
    }
  }

  routes.push(firstRouter)
  routes.push({
    path: '/:pathMatch(.*)',
    redirect: '/dashboard/workplace',
    hidden: true
  })
  return routes
}
