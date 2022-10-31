const config = {
  type: 'localStorage',
  prefix: 'ms_',
  expire: 7 * 24 * 60 * 60 * 1000, // 过期时间
  isEncrypt: true
}

export const setStorage = (key, value, expire = config.expire) => {
  if (value === '' || value === null || value === undefined) {
    value = null
  }

  const data = {
    value,
    time: Date.now(),
    expire
  }
  const dataJson = JSON.stringify(data)
  window[config.type].setItem(`${config.prefix}${key}`, dataJson)
}

export const getStorage = (key) => {
  let val = null
  const KEY = `${config.prefix}${key}`

  if (
    !window[config.type].getItem(KEY) ||
    JSON.stringify(window[config.type].getItem(KEY)) === 'null'
  ) {
    return val
  }

  const data = JSON.parse(window[config.type].getItem(KEY))
  const now = Date.now()
  if (data.expire && data.expire < now - data.time) {
    removeStorage(key)
    return null
  } else {
    setStorage(key, data.value, data.expire)
  }
  return data.value
}

export const removeStorage = (key) => window[config.type].removeItem(`${config.prefix}${key}`)

export const clearStorage = () => window[config.type].clear()
