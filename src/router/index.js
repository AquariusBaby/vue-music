import Vue from 'vue'
import Router from 'vue-router'
/*import Hello from '@/components/Hello'*/
import Header from '@/components/Header/Header.vue'
import MusicList from '@/components/MusicList/MusicList.vue'
import Find from '@/components/Find/Find.vue'
import One from '@/components/One/One.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: MusicList,
      redirect: '/music-list'
    },
    {
    	path: '/music-list',
    	component: MusicList
    },
    {
    	path: '/find',
    	component: Find
    },
    {
    	path: '/one',
    	component: One
    }
  ]
})
