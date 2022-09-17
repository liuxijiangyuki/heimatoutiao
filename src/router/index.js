import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import User from '@/views/User'
import Home from '@/views/Home'
import Search from '@/views/Search'
import searchResult from '@/views/Search/searchResult'
import ArticleDetail from '@/views/ArticleDetail'
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
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'user',
        component: User
      },
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchresult/:kw',
    component: searchResult
  },
  {
    path: '/detail',
    component: ArticleDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
