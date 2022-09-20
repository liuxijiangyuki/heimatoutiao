<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list"
      :class="{'art-cmt-container-1': boxPadding === isShowComBox, 'art-cmt-container-2': boxPadding !== isShowComBox }">
      <!-- 评论的 Item 项 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false'>
        <div class="cmt-item" v-for="obj in commentList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar">
              <span class="uname">zs</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like" size="16" color="red" v-if="obj.is_liking === true" @click="likeFn(true, obj)" />
              <van-icon name="like-o" size="16" color="gray" v-else @click="likeFn(false, obj)" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content}}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{timeAgo(obj.pubdate)}}</div>
        </div>
      </van-list>
    </div>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowComBox === true">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="isShowComBox = false">发表评论</div>
      <div class="icon-box">
        <van-badge :content='totalCount > 0 ? totalCount : ""'>
          <van-icon name="comment-o" size="0.53333334rem" @click="toCommentFn" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" v-if="isCollect === false" />
        <van-icon name="star" size="0.53333334rem" color="yellow" v-else />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea placeholder="友善评论、理性发言、阳光心灵" @blur="blurFn" v-model="comText"></textarea>
      <van-button type="default" :disabled='comText.length === 0' @click='sendFn'>发布</van-button>
    </div>
  </div>
</template>

<script>
import { getArtCommentsAPI, unlikeCommentAPI, likeCommentAPI, sendComAPI } from '@/api'
import { timeAgo } from '@/utils/date.js'
export default {
  name: 'artCommit',
  props: {
    bool: Boolean
  },
  data () {
    return {
      commentList: [],
      offset: null,
      isShowComBox: true,
      boxPadding: true,
      totalCount: 0,
      comText: '',
      loading: false,
      finished: false,
      comOffset: null,
      isCollect: this.bool
    }
  },
  async created () { // 获取评论
    setTimeout(async () => {
      const res = await getArtCommentsAPI({
        id: this.$route.query.art_id
      })
      console.log(res)
      this.commentList = res.data.data.results
      this.totalCount = res.data.data.total_count
      this.comOffset = res.data.data.last_id
      console.log(this.isCollect)
    }, 0)
  },
  methods: {

    timeAgo,
    async likeFn (bool, obj) {
      if (bool === true) { // 取消点赞
        obj.is_liking = false
        await unlikeCommentAPI({
          target: obj.com_id
        })
      } else { // 点赞
        obj.is_liking = true
        await likeCommentAPI({
          target: obj.com_id
        })
      }
    },
    toCommentFn () { // 滚动到评论区
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 点击发送评论,
    async sendFn () {
      const res = await sendComAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      this.commentList.unshift(res.data.data.new_obj)
      this.totalCount++
      this.toCommentFn()
    },
    blurFn () { // 输入框失去焦点
      setTimeout(() => {
        this.isShowComBox = true
        this.comText = ''
      }, 0)
    },
    async onLoad () {
      if (this.commentList.length > 0) {
        const res = await getArtCommentsAPI({
          id: this.$route.query.art_id,
          offset: this.comOffset
        })
        console.log(res)
        this.commentList = [...this.commentList, ...res.data.data.results]
        if (res.data.data.last_id === null) {
          this.finished = true
        }
        this.totalCount = res.data.data.total_count
        this.comOffset = res.data.data.last_id
        this.loading = false
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
