<template>
  <div class="w-full h-full flex items-center justify-center px-4">
    <div class="w-full sm:w-3/5 lg:w-2/5 bg-white px-6 py-12 rounded">
      <a-form :model="loginState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="loginState.username" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="loginState.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button block type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
const loginState = reactive({
  username: '',
  password: ''
})
</script>
