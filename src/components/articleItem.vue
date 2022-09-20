
<template >
  <!-- 一条文章单元格 -->
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span> {{ artObj.title}}</span>
          <img v-if="artObj.cover.type === 1" v-lazy='artObj.cover.images[0]' alt="" class="thumb">
        </div>
        <div v-if="artObj.cover.type > 1" class="thumb-box">
          <img v-for="(imgUrl, index) in artObj.cover.images" :key="index" v-lazy='imgUrl' alt="" class="thumb">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name}}</span>
            <span>{{ artObj.comm_count }}</span>
            <span> {{ formateTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body"
      :cancel-text="bottomText" @cancel='cancelFn' @close="closeFn" />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formateTime: timeAgo,
    onSelect (actions, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      console.log(actions)
      if (actions.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (actions.name === '不感兴趣') {
        this.$emit('dislikeEV', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('reportEV', this.artObj.art_id, actions.value)
        this.show = false
      }
    },
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
