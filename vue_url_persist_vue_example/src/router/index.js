import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/form1',
  },
  {
    path: '/form1',
    component: () => import('../views/Form1'),
  },
  {
    path: '/form2/',
    component: () => import('../views/Form2'),
    children: [
      {
        path: ':id',
        component: () => import('../views/Form2Tab'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
