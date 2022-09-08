<template>
  <div>
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit">
      <van-field required v-model="user.mobile" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ required: true, message: '请填写11位手机号' ,pattern: /^1[3-9]\d{9}$/}]" />
      <van-field required v-model="user.code" type="password" name="code" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写6位密码' , pattern: /^\d{6}$/}]" />
      <div style="margin: 16px;">
        <van-button :loading="isloading" loading-text="加载中..." :disabled="isloading" round block type="info"
          native-type="submit">登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from 'vant'
import { setToken } from '@/utils/token.js'
import { loginAPI } from '@/api'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isloading: false
    }
  },
  methods: {
    async onSubmit (values) {
      console.log(this.user)
      this.isloading = true
      try {
        const res = await loginAPI(this.user)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.data.token)
      } catch (err) {
        Notify({ type: 'danger', message: '手机号或密码错误' })
      }
      this.isloading = false
    }
  }
}
</script>

<style scoped>
</style>
