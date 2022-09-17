<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img src="@/assets/toutiao_logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="toSearch" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏 -->
    <div class="main">
      <van-tabs v-model="channelID" sticky offset-top="1.2266667rem" animated>
        <van-tab :title="obj.name" :name="obj.id" v-for="obj in userChannelList" :key="obj.art_id">
          <articleList :channelID="channelID"> </articleList>
        </van-tab>

      </van-tabs>
    </div>
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="plusClick" />
    <van-popup v-model="show" class="plus" get-container="body">
      <channelEdit :userList='userChannelList' :moreList='moreChannelList' @addChannelEV='addChannelFn'
        @delChannelEV='delChannelFn' @closeEV='closeMoreFn' ref="editRef" v-model="channelID"> </channelEdit>
    </van-popup>
  </div>
</template>

<script>
import articleList from './components/articleList.vue'
import { getUserChannelAPI, allChannelListAPI, updateChannelAPI, delUserChannelAPI } from '@/api'
import channelEdit from './channelEdit.vue'
export default {
  data () {
    return {
      channelID: 0,
      userChannelList: [],
      allChannelList: [],
      show: false
    }
  },
  async created () {
    const res = await getUserChannelAPI()
    this.userChannelList = res.data.data.channels
    console.log(res)
    const res2 = await allChannelListAPI()
    console.log(res2)
    this.allChannelList = res2.data.data.channels
  },
  components: { articleList, channelEdit },
  methods: {
    async plusClick () {
      this.show = true
    },
    async addChannelFn (obj) {
      this.userChannelList.push(obj)
      const afterAry = this.userChannelList.filter(obj => obj.id !== 0)
      const newAry = afterAry.map((obj, index) => {
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index
        return newObj
      })
      await updateChannelAPI({
        channels: newAry
      })
    },
    async delChannelFn (obj) {
      const index = this.userChannelList.findIndex(theObj => theObj.id === obj.id)
      this.userChannelList.splice(index, 1)
      await delUserChannelAPI({
        channelId: obj.id
      })
    },
    async closeMoreFn () {
      this.show = false
      this.$refs.editRef.isEdit = false
    },
    toSearch () {
      this.$router.push('/search')
    }
  },
  computed: {
    moreChannelList () {
      const moreAry = this.allChannelList.filter(bigObj => {
        const index = this.userChannelList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return moreAry
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.plus {
  width: 100vw;
  height: 100vh;
}
</style>
