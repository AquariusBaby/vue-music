import Vue from 'vue'
import Router from 'vue-router'
/*import Index from '@/views/Index.vue'
import Rage from '@/views/Rage.vue'
import SongList from '@/views/SongList.vue'*/

Vue.use(Router)

/*export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/rage',
          component: Rage
        },
        {
          path: 'songList',
          component: SongList
        }
      ]
    },
    {
    	path: '*',
    	redirect: '/index'
    }
  ]
})*/

const router = new Router({
  routes: [{
    path: '/index',
    component: require('../views/index'),
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      }
    ]
    },
    {
      path: '*', redirect: '/index/rage'
    }
  ]
})

export default router
