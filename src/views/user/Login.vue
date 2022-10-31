<template>
  <div class="login">
    <a-tabs v-model:active-key="activeKey" centered>
      <a-tab-pane key="dingdingKey" tab="钉钉登录">
        <div id="login_container"></div>
      </a-tab-pane>
      <a-tab-pane key="userLogin" tab="系统登录">
        <a-form class="w-80" :model="loginState" @finish="onFinish">
          <a-form-item
            name="userName"
            :rules="[{ required: true, message: '请输入账号' }]"
            validate-trigger="blur"
          >
            <a-input v-model:value="loginState.userName" size="large" placeholder="账号">
              <template #prefix>
                <user-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
            validate-trigger="blur"
          >
            <a-input-password v-model:value="loginState.password" size="large" placeholder="密码">
              <template #prefix>
                <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button size="large" block type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import * as dd from 'dingtalk-jsapi'
import { loginByCode, user } from '@/apis/user.js'
import { notification } from 'ant-design-vue'

const router = useRouter()
const notInDingTalk = dd.env.platform === 'notInDingTalk'

if (notInDingTalk) {
  getDingCode()
} else {
  LoginByCode()
}

const activeKey = ref('dingdingKey')
const loginState = reactive({
  userName: '',
  password: ''
})

function getDingCode() {
  nextTick(() => {
    const url = `https://oapi.dingtalk.com/connect/qrconnect?appid=${window.yskc.dingDingAppId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${window.yskc.baseUrl}/ding/dingLogin`
    window.DDLogin({
      id: 'login_container', // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
      goto: encodeURIComponent(url), // 请参考注释里的方式
      style: 'border:none;background-color:#FFFFFF;',
      width: '365',
      height: '400'
    })
    const handleMessage = function (event) {
      const data = event.data
      const origin = event.origin
      if (origin === 'https://login.dingtalk.com' || origin === 'https://pre-login.dingtalk.com') {
        window.location = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${window.yskc.dingDingAppId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${window.yskc.baseUrl}/ding/dingLogin&loginTmpCode=${data}`
      }
    }
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', handleMessage, false)
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', handleMessage)
    }
  })
}

function LoginByCode() {
  dd.runtime.permission.requestAuthCode({
    corpId: window.yskc.corpId,
    onSuccess: ({ code }) => {
      loginByCode({ code }).then(() => success())
    },
    onFail: () => {
      console.log('fail')
    }
  })
}

const onFinish = (value) => user(value).then(() => success())

async function success() {
  router.push({ name: 'login' })
  await nextTick()
  notification.success({
    message: '欢迎',
    description: '欢迎回来'
  })
}
</script>

<style lang="scss" scoped>
.login {
  & :deep(.ant-tabs-nav::before) {
    display: none;
  }
}
</style>
