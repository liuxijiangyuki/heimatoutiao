<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false"
        offset="50">
        <articleItem v-for="obj in list" :key="obj.id" :artObj="obj" @dislikeEV='dislikeFn' @reportEV="reportFn">
        </articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from './articleItem.vue'
import { dislikeArticleAPI, getArticleListAPI, reportArticleAPI } from '@/api'
import { Notify } from 'vant'
export default {
  components: { articleItem },
  props: {
    channelID: Number
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: (new Date()).getTime(),
      isLoading: false // 下拉刷新变量
    }
  },

  async created () {
    this.getArticleListFn()
  },
  methods: {
    async onLoad () {
      this.getArticleListFn()
    },
    async onRefresh () {
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },
    async getArticleListFn () {
      const res2 = await getArticleListAPI({
        channel_id: this.channelID,
        timestamp: this.theTime
      })
      console.log(res2)
      if (res2.data.data.pre_timestamp === null) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...res2.data.data.results]
      this.theTime = res2.data.data.pre_timestamp
      this.loading = false
      this.isLoading = false
    },
    async dislikeFn (id) {
      await dislikeArticleAPI({ artId: id })
      Notify({
        type: 'success',
        message: '反馈成功'
      })
    },
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({
        type: 'success',
        message: '举报成功'
      })
    }
  }
}
</script>

<style>
</style>
