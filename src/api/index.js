import request from '@/utils/request'

export const loginAPI = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 更新用户频道
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
// 删除用户频道
export const delUserChannelAPI = ({ channelId }) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}

// 获取用户频道
export const getUserChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'

  })
}
// 获取新闻推荐
export const getArticleListAPI = ({ channel_id, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',

    params: {
      channel_id,
      timestamp
    }
  })
}
export const dislikeArticleAPI = ({ artId }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',

    data: {
      target: artId
    }
  })
}
export const reportArticleAPI = ({ artId, type }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',

    data: {
      target: artId,
      type: type,
      remark: '其他问题'
    }
  })
}
// 获取文章详情
export const detailAPI = ({ artId }) => {
  return request({
    url: `/v1_0/articles/${artId}`
  })
}
// 搜索推荐关键词
export const searchKeywordAPI = ({ keyword }) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
// 获取搜索结果
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}

// 关注用户
export const followedAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取关用户
export const unFollowedAPI = ({ target }) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
// 点赞文章
export const likeArticleAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消点赞
export const unLikeArticleAPI = ({ target }) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
// 获取文章评论
export const getArtCommentsAPI = ({ id, offset = null, limit = 10 }) => {
  return request({
    url: 'v1_0/comments',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}
// 对评论点赞
export const unlikeCommentAPI = ({ target }) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
// 取消点赞
export const likeCommentAPI = ({ target }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 发布评论
export const sendComAPI = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) { // 对评论进行回复需要传递评论id
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: id,
      content,
      art_id
    }
  })
}
// 收藏文章接口
export const collectArtAPI = ({ id }) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// 取消收藏文章
export const cancelColArtAPI = ({ target }) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 获取用户个人资料
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
