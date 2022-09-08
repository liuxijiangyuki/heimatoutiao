import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 200000
})

export default ({ url, method = 'GET', params = {}, data = {}, headers }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
