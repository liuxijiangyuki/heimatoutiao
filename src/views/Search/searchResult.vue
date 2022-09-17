<template>
  <div>

    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
      <van-list :immediate-check='false' v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
        offset='50'>
        <articleItem @click.native='toDetail(obj.art_id)' :artObj='obj' v-for="obj in searchResultList"
          :key="obj.art_id" :isShow='false'></articleItem>
      </van-list>
    </div>

  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import articleItem from '@/components/articleItem'
export default {
  components: {
    articleItem
  },
  data () {
    return {
      page: 1,
      searchResultList: [],
      loading: false,
      finished: false
    }
  },
  name: 'SearchResult',
  async created () {
    const res = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    console.log(res)
    this.searchResultList = res.data.data.results
  },
  methods: {
    async onLoad () {
      if (this.searchResultList.length > 0) {
        this.page++
        const res = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        console.log(res)
        this.searchResultList = [...this.searchResultList, ...res.data.data.results]
        this.loading = false
        console.log(this.searchResultList)
      }
    },
    // 跳转文章详情
    toDetail (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }

}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
