import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import User from '@/views/User'
// import Home from '@/views/Home'
// import Search from '@/views/Search'
// import searchResult from '@/views/Search/searchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import Chat from '@/views/Chat'
Vue.use(VueRouter)
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    beforeEnter (to, from, next) {
      if (getToken()?.length > 0 && to.path === '/login') {
        next('/layout/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'user',
        component: () => import('@/views/User')
      },
      {
        path: 'home',
        component: () => import('@/views/Home'),
        meta: {
          scrollTop: 0
        }
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/searchresult/:kw',
    component: () => import('@/views/Search/searchResult')
  },
  {
    path: '/detail',
    component: () => import('@/views/ArticleDetail')
  },
  {
    path: '/useredit',
    component: () => import('@/views/User/UserEdit')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat')

  }

]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (getToken()?.length > 0 && to.path === '/login') {
//     next(false)
//   } else {
//     next()
//   }
// })
export default router
