<template>
  <div class="w-full h-full bg-[url('@/assets/background.svg')] flex flex-col">
    <div class="flex-1 flex flex-col items-center py-28">
      <div>
        <a-typography-link href="/">
          <a-typography-title>优赛创新标准化项目管理系统</a-typography-title>
        </a-typography-link>
      </div>
      <router-view />
    </div>

    <a-space
      direction="vertical"
      class="h-24 text-gray-500 flex flex-col items-center justify-center"
    >
      <a-space :size="40">
        <a href="_self" class="text-gray-500">帮助</a>
        <a href="_self" class="text-gray-500">隐私</a>
        <a href="_self" class="text-gray-500">条款</a>
      </a-space>
      <a-space>
        <span>Copyright &copy; {{ year }} 优赛科创</span>
        <span>V 1.1.0</span>
      </a-space>
    </a-space>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped></style>
