import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    // webpackChunkName: 'home' 给路由模块起一个别名
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true // 自定义数据  父路由设置子路由就不用设置了
    }, // meta 默认就是一个空对象
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course' */ '@/views/role/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course' */ '@/views/user/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/resource-category.vue')
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'alloc-resource' */ '@/views/role/alloc-resource.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/course/create',
        name: 'course-create',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        // webpackChunkName: 'home' 给路由模块起一个别名
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
// to: 要去哪里的路由信息
// from: 从哪里来的路由信息
// next: 通行的标志
router.beforeEach((to, from, next) => {
  // to.matched 是一个数组 是匹配到的路由记录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页
      next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    // 路由守卫中一定要调用 next，否则页面无法显示
    next() // 允许通过
  }
})

export default router
