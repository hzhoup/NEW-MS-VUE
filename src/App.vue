<template>
  <a-spin size="large" :spinning="false">
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

const locale = ref(zhCN)

const comSize = ref('middle')

const getPopupContainer = (triggerNode) => triggerNode.parentNode
</script>
