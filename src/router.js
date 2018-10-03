/* global Vue */
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EditPage from '@/components/EditPage'
import LibraryPage from '@/components/LibraryPage'
import UserPage from '@/components/UserPage'
import DrgPage from '@/components/DrgPage'
import BlockPage from '@/components/BlockPage'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/user',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/drg',
      name: 'DrgPage',
      component: DrgPage
    },
    {
      path: '/block',
      name: 'BlockPage',
      component: BlockPage
    }
  ]
})
