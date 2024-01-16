import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
