import Vue from 'vue'
import Router from 'vue-router'
import vLoading from '../pages/loading/loading.vue'
import vLogin from '../pages/login/login.vue'
import vSign from '../pages/signup/signup.vue'
import vPassword from '../pages/password/password.vue'
import vSell from '../pages/sell/sell.vue'
import vBuy from '../pages/buy/buy.vue'
import vShopping from '../pages/shopping/shopping.vue'
import vInfo from '../pages/info/info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: vLoading
    },
    {
      path: '/login',
      name: 'login',
      component: vLogin
    },
    {
      path: '/signup',
      name: 'signup',
      component: vSign
    },
    {
      path: '/password',
      name: 'password',
      component: vPassword
    },
    {
      path: '/sell',
      name: 'sell',
      component: vSell
    },
    {
      path: '/buy',
      name: 'buy',
      component: vBuy
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: vShopping
    },
    {
      path: '/info',
      name: 'info',
      component: vInfo
    }
  ]
})
