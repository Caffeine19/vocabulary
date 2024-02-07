import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

import MainView from '@/views/MainView/index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history:createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      redirect: '/main/snippet',
      children: [
        {
          path: '/main/snippet',
          name: 'snippet',
          component: () => import('@/views/MainView/SnippetView/index.vue')
        }
      ]
    }
  ]
})

export default router
