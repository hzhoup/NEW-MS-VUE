<template>
  <a-spin size="large" :spinning="setting.pageLoad">
    <a-config-provider
      :locale="locale"
      :component-size="comSize"
      :get-popup-container="getPopupContainer"
    >
      <main class="w-screen h-screen bg-gray-100 overflow-hidden font-sans">
        <router-view />
      </main>
    </a-config-provider>
  </a-spin>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useSetting } from '@/stores/setting.js'

const locale = ref(zhCN)
const comSize = ref('middle')

const setting = useSetting()

const getPopupContainer = (triggerNode) => triggerNode.parentNode
</script>
