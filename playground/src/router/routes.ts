import type { RouteRecordRaw } from 'vue-router'

export const backStageRoute: RouteRecordRaw[] = [
  {
    name: 'backStage',
    path: '/backStage',
    component: () => import('@/layout/BackstageLayout.vue'),
    meta: {
      title: '后台',
    },
    children: [
      {
        name: 'backStageUser',
        path: 'user',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/backstage/user/index.vue'),
      },
    ],
  },
]

export const chatroomRoute: RouteRecordRaw[] = [
  {
    name: 'chatroom',
    path: '/chatroom',
    children: [

    ],
  },
]

export const ALL_ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index.vue'),
  },
  ...chatroomRoute,
  ...backStageRoute,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/404.vue') },
]
console.log('ALL_ROUTES', ALL_ROUTES)
