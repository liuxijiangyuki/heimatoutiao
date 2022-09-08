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
