import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import dayjs from 'dayjs'
import Qs from 'qs'

const service = axios.create({
  baseURL: '/api/',
  timeout: 180000
})

const err = (error) => {
  if (error.response) {
    const { data, status } = error.response
    if (status === 403) {
      console.log(data)
      return Promise.resolve({ success: false })
    } else if (status === 401 && !(data.result && data.result.isLogin)) {
      console.error('认证失败!')
      const token = getStorage('Access-Token')
      if (token) {
        //TODO: 退出登录
      }
      return Promise.resolve({ success: false })
    }
  }
  return Promise.reject(error)
}

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

service.interceptors.request.use(request, err)

service.interceptors.response.use((response) => {
  return response
}, err)

export default service
