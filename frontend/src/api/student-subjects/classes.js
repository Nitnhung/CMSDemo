export default [
  {
    path: '/class/:id',
    name: 'class-detail',
    component: () => import('../../views/ClassDetailView.vue'),
    meta: {
      title: 'Chi tiết lớp học',
      requiresAuth: true
    }
  }
]