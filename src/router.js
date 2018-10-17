/* global Vue */
import Router from 'vue-router'
import TestPage from '@/components/TestPage'
import EditPage from '@/components/EditPage'
import LibraryPage from '@/components/LibraryPage'
import UserPage from '@/components/UserPage'
import StatPage from '@/components/StatPage'

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
      name: 'UserPage',
      component: UserPage
    },    
    {
      path: '/edit',
      name: 'EditPage',
      component: EditPage
    },
    {
      path: '/library',
      name: 'LibraryPage',
      component: LibraryPage
    },
    {
      path: '/stat',
      name: 'StatPage',
      component: StatPage
    }
  ]
})
