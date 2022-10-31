import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { getStorage } from '@/utils/storage.js'
import { getInfo } from '@/apis/user.js'
import { message } from 'ant-design-vue'
import { useAppState } from '@/stores/appState.js'

const whiteList = ['login', 'register', 'registerResult', 'dingLogin']

export const routes = [
  {
    path: '/user',
    redirect: '/user/user',
    component: () => import('@/layouts/UserLayout.vue'),
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const token = getStorage('Access-Token')

  if (token) {
    if (to.path === 'user/login') next({ path: '/' })
    else {
      const appState = useAppState()
      if (appState.menus.length === 0) {
        try {
          const menus = await getInfo()
          router.addRoute(menus)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            next()
          } else {
            next({ path: redirect })
          }
        } catch (e) {
          message.error('获取用户信息失败')
          //TODO: 登出
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) next()
    else next({ path: '/user/user', query: { redirect: to.fullPath } })
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
