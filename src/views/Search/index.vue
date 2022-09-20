<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search v-model.trim="kw" placeholder="请输入搜索关键词" background="#007BFF" shape="round" @input="inputFn"
        @search='toSearch(kw)' v-fofo />
    </div>
    <!-- 搜索列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item" v-for="(str, index) in searchList" :key="index" v-html="lightFn(str,kw)"
        @click="clickToSearch(str)">
        {{ str }}
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="delHistory" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(str, index) in history" :key="index"
          @click="historyToSearch(str)">{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { searchKeywordAPI } from '@/api'
import { getStorage, setStorage } from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null,
      searchList: [],
      history: JSON.parse(getStorage('his')) || []// 搜索历史
    }
  },
  methods: {
    inputFn () {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.searchList = []
      } else {
        setTimeout(async () => {
          console.log(123)
          const res = await searchKeywordAPI({
            keyword: this.kw
          }, 300)
          console.log(123)
          this.searchList = res.data.data.options
        }, 0)
      }
    },
    lightFn (originStr, target) {
      return originStr.replace(target, `<span style= "color: red;">${target}</span>`)
    },
    // 通过回车
    toSearch (str) {
      this.history.push(str)
      const tset = new Set(this.history)
      this.history = Array.from(tset)
      setTimeout(() => {
        this.$router.push(`/searchresult/${str}`)
      }, 0)
    },
    // 通过衍生词
    clickToSearch (str) {
      this.history.push(str)
      const tset = new Set(this.history)
      this.history = Array.from(tset)
      setTimeout(() => {
        this.$router.push(`/searchresult/${str}`)
      }, 0)
    },
    // 通过历史记录
    historyToSearch (str) {
      this.$router.push(`/searchresult/${str}`)
    },
    delHistory () {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler () {
        setStorage('his', JSON.stringify(this.history))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
