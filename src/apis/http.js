import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import dayjs from 'dayjs'
import Qs from 'qs'
import NProgress from 'nprogress'
import { useSetting } from '@/stores/setting.js'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: '/api/',
  timeout: 180000
})

const request = (config) => {
  const { headers, method, data, params } = config
  const token = getStorage('Access-Token')
  if (token) {
    headers['Access-Token'] = token
  }
  if (method === 'post') {
    for (const dataKey in data) {
      if (dayjs.isDayjs(data[dataKey])) {
        data[dataKey] = data[dataKey].format('YYYY-MM-DD HH:mm:ss')
      } else if (typeof data[dataKey] === 'string') {
        data[dataKey] = data[dataKey].trim()
      }
    }
  } else if (method === 'get' && params) {
    config.paramsSerializer = (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat', allowDots: true })
    }
    for (const paramsKey in params) {
      if (dayjs.isDayjs(params[paramsKey])) {
        params[paramsKey] = params[paramsKey].format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
  return config
}

const err = (error) => {
  if (error.response) {
    const { data, status } = error.response
    if (status === 403) {
      console.error(data)
      return Promise.resolve({ success: false })
    } else if (status === 401 && !(data.result && data.result.isLogin)) {
      console.error(data)
      const token = getStorage('Access-Token')
      if (token) {
        //TODO: 重登
      }
      return Promise.resolve({ success: false })
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(request, err)

service.interceptors.response.use((res) => {
  const { success, errorMessage } = res.data
  if (!success) {
    message.error(errorMessage).then()
    return Promise.reject(res.data)
  }
  return res.data
}, err)

const get = (url, params, config = {}) => {
  const setting = useSetting()
  const { showPageLoad = false, showProgress = false } = config

  if (showPageLoad) setting.pageLoad.value = true
  if (showProgress) NProgress.start()

  return service.get(url, { params }).finally(() => {
    if (showPageLoad) setting.pageLoad.value = false
    if (showProgress) NProgress.done()
  })
}

const post = (url, params, config) => {
  const setting = useSetting()
  const { showPageLoad, showProgress } = config

  if (showPageLoad) setting.pageLoad = true
  if (showProgress) NProgress.start()

  return service.post(url, params).finally(() => {
    if (showPageLoad) setting.pageLoad = false
    if (showProgress) NProgress.done()
  })
}

const http = {
  get,
  post
}

export default http
