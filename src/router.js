/* global Vue */
import Router from 'vue-router'
import TestPage from '@/components/TestPage'
import HomePage from '@/components/HomePage'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
