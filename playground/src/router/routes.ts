import type { RouteRecordRaw } from 'vue-router'

export const backStageRoute: RouteRecordRaw[] = [
  {
    name: 'backstage',
    path: '/backstage',
    component: () => import('@/layout/BackstageLayout.vue'),
    meta: {
      title: '后台',
    },
    children: [
      {
        name: 'backstage-user',
        path: 'user',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/pages/backstage/user/index.vue'),
      },
      {
        name: 'backstage-rooms',
        path: 'rooms',
        meta: {
          title: '房间管理',
        },
        component: () => import('@/pages/backstage/rooms/index.vue'),
      },
    ],
  },
]

export const chatroomRoute: RouteRecordRaw[] = [
  {
    name: 'chatroom',
    path: '/chatroom',
    component: () => import('@/pages/chatroom/index.vue'),
  },
]

export const ALL_ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/auth/index.vue'),
  },
  ...chatroomRoute,
  ...backStageRoute,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/404.vue') },
]
console.log('ALL_ROUTES', ALL_ROUTES)
