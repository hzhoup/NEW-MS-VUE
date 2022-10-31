import http from './http.js'
import { setStorage } from '@/utils/storage.js'
import { generateRoutes } from '@/router/generateRoutes.js'
import { routes } from '@/router/index.js'
import { useAppState } from '@/stores/appState.js'

export const user = async (params) => {
  params.loginType = 0
  const { data } = await http.post('user/login', params, { showPageLoad: true })
  setStorage('Access-Token', data)
  return true
}

export const loginByCode = async (params) => {
  const { data } = await http.post('user/loginByCode', params, { showPageLoad: true })
  setStorage('Access-Token', data)
  return true
}

export const getInfo = async () => {
  const appState = useAppState()
  const { data } = await http.get('user/info')
  const { user, menus } = data
  const genRoutes = generateRoutes(menus)
  const newMenus = routes.concat(genRoutes)
  appState.userinfo = user
  appState.menus = newMenus
  return newMenus
}
