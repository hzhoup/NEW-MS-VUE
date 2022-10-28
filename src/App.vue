<template>
  <a-config-provider
    :locale="locale"
    :component-size="comSize"
    :get-popup-container="getPopupContainer"
  >
    <router-view />
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = ref(zhCN)

const comSize = ref('middle')

const getPopupContainer = (triggerNode) => triggerNode.parentNode
</script>
