/* global Vue */
import Router from 'vue-router'
import TestPage from '@/components/TestPage'
import HomePage from '@/components/HomePage'
import EditPage from '@/components/edit/EditPage'
import LibraryPage from '@/components/library/LibraryPage'
import UserPage from '@/components/user/UserPage'
import StatPage from '@/components/stat/StatPage'
import ForumPage from '@/components/forum/ForumPage'

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
