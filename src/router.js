/* global Vue */
import Router from 'vue-router'
import TestPage from '@/components/TestPage'
import HomePage from '@/components/HomePage'
import EditPage from '@/components/EditPage'
import LibraryPage from '@/components/LibraryPage'
import UserPage from '@/components/UserPage'
import StatPage from '@/components/StatPage'
import ForumPage from '@/components/ForumPage'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
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
    },
    {
      path: '/forum',
      name: 'ForumPage',
      component: ForumPage
    }
  ]
})
