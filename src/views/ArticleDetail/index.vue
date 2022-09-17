<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title"> {{ artObj.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artObj.aut_name" label="3天前">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="artObj.is_followed" @click="followedFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followedFn(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="artObj.like_count === 1" @click="loveFn(true)">已点赞
        </van-button>
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="loveFn(false)">点赞</van-button>
      </div>
    </div>
    <!-- 评论 -->
    <artCommit></artCommit>
  </div>
</template>

<script>
import { detailAPI, followedAPI, unFollowedAPI, unLikeArticleAPI, likeArticleAPI } from '@/api'
import artCommit from './artCommit'
export default {
  data () {
    return {
      artObj: {},
      bool: true
    }
  },
  async created () {
    console.log(this.artObj)
    const res = await detailAPI({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.artObj = res.data.data
    this.bool = res.data.data.is_collected
    console.log(this.bool)
  },
  methods: {
    async followedFn (bool) { // 取关操作
      if (bool === true) {
        this.artObj.is_followed = false
        const res = await unFollowedAPI({
          target: this.artObj.aut_id
        })
        console.log(res)
      } else { // 关注操作
        this.artObj.is_followed = true
        const res = await followedAPI({
          target: this.artObj.aut_id
        })
        console.log(res)
      }
    },
    async loveFn (bool) {
      if (bool === true) { // 取消点赞
        this.artObj.like_count = 0
        await unLikeArticleAPI({
          target: this.artObj.art_id
        })
      } else { // 点赞
        this.artObj.like_count = 1
        await likeArticleAPI({
          target: this.artObj.art_id
        })
      }
    }

  },
  components: {
    artCommit
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
