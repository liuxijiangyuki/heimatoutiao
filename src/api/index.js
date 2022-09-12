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
