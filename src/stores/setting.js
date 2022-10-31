import { defineStore } from 'pinia'

export const useSetting = defineStore('setting', () => {
  const setting = reactive({
    pageLoad: false
  })

  return { ...toRefs(setting) }
})
