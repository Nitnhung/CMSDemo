import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MainLayout from '../layout/MainLayout.vue'
import ClassDetailView from '../views/ClassDetailView.vue'
import StudentDetailView from '../views/StudentDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // Định nghĩa gốc là cấu trúc Layout chung
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'class/:id',
          name: 'class-detail',
          component: ClassDetailView,
          props: true
        },
        {
          path: 'class/:id/students',
          name: 'class-students',
          component: StudentDetailView,
          props: true
        }
      ]
    }
  ]
})

export default router

