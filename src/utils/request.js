import theAxios from 'axios'
import { Notify } from 'vant'
import { getToken, removeToken, setToken } from './token'
import { uptUserTokenAPI } from '@/api'
import router from '@/router'
const axios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
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
  console.log(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    // router.push({ path: '/login' })

    removeToken()
    const res = await uptUserTokenAPI() // 刷新token的接口 会返回一个新的token

    setToken(res.data.data.token)
    error.config.headers.Authorization = `Bearer ${res.data.data.token}` // 给被拦截的请求添加上新请求头
    return axios(error.config) // 重新请求被拦截的请求
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    localStorage.clear()
    Notify({
      type: 'warning',
      message: '登陆已过期'
    })
    router.replace('/login')
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
