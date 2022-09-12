import theAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from './token'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 200000
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么, 如果vuex里有token携带在请求头中
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    // 发起请求之前, 把token携带在请求头上(表明自己身份)
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) { // 当状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, async function (error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    router.push({ path: '/login' })
    Notify({
      type: 'warning',
      message: '登陆已过期'
    })
  }

  return Promise.reject(error)
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
