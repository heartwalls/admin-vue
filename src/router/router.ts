// 对外暴露路由配置
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由，权限管理时使用
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'home',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]
