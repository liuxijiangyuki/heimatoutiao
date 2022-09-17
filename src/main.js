import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, CellGroup, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider, Tag } from 'vant'

Vue.use(CellGroup)
Vue.use(Tag)

Vue.use(Divider)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        const theInput = el.querySelector('input')
        theInput.focus()
      }
    })
  }
}
Vue.use(directiveObj)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
