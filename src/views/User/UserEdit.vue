<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center @click="changeAvatar">
        <template #default>
          <van-image round class="avatar" :src="profileObj.photo" />
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profileObj.name" @click="userNameFn" />
      <van-cell title="生日" is-link :value="profileObj.birthday" @click="selectBirthdayFn" />
    </van-cell-group>
    <van-dialog v-model="show" title="标题" show-cancel-button v-fofo @confirm='confirmFn' :before-close='beforeCloseFn'>
      <input type="text" v-model="nameText">
    </van-dialog>
    <!-- 日期 -->
    <van-popup v-model="timeCheckShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
        @confirm='confirmDateFn' @cancel='cancleDateFn' />
    </van-popup>
  </div>
</template>

<script>
import { userProfileAPI, userAvatarAPI, updateUserNameAPI } from '@/api'
import { Notify } from 'vant'
import { fomartTime } from '@/utils/date.js'
export default {
  name: 'UserEdit',
  data () {
    return {
      profileObj: {},
      show: false,
      nameText: '',
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      timeCheckShow: false
    }
  },
  async created () {
    const res = await userProfileAPI()
    console.log(res)
    this.profileObj = res.data.data
  },
  methods: {
    changeAvatar () { // 头像点击事件
      this.$refs.iptFile.click()
    },
    async onFileChange (e) { // 头像文件框事件
      if (e.target.files.length === 0) return
      console.log(e.target.files[0])
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await userAvatarAPI(theFd)
      this.profileObj.photo = res.data.data.photo
      this.$store.commit('SET_USERPHOTO', res.data.data.photo)
    },
    userNameFn () {
      this.show = true
      this.profileObj.name = this.nameText
    },
    confirmFn () { // 点击确定后回调函数

    },
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.nameText) === true) {
          done()
          await updateUserNameAPI({
            name: this.nameText
          })
          this.profileObj.name = this.nameText
        } else {
          Notify({ type: 'warning', message: '请输入1-7位数字字母或中文组合' })
        }
      } else {
        done()
      }
    },
    selectBirthdayFn () {
      this.timeCheckShow = true
      this.currentDate = new Date(this.profileObj.birthday)
    },
    async confirmDateFn () { // 点击确定选择日期
      await updateUserNameAPI({
        birthday: fomartTime(this.currentDate)
      })
      this.profileObj.birthday = fomartTime(this.currentDate)
      this.timeCheckShow = false
    },
    cancleDateFn () { // 取消选择时间
      this.timeCheckShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-dialog__content {
  text-align: center;
  input {
    border: none;
    padding: 0;
    height: 40px;
  }
}
</style>
