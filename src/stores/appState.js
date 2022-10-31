import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAppState = defineStore('appState', () => {
  const app = reactive({
    userinfo: {},
    menus: []
  })

  return { ...toRefs(app) }
})
