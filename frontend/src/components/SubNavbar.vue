<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex space-x-8 h-14 items-center">
        <!-- Link về Dashboard tổng quan -->
        <router-link 
          to="/" 
          class="flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all border-b-2"
          :class="$route.path === '/' && !$route.hash ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'"
        >
          <span>📊 Dashboard</span>
        </router-link>

        <!-- Link nhanh đến danh sách lớp -->
        <button
          type="button"
          class="flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all border-b-2"
          :class="$route.path === '/' && $route.hash === '#class-list'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'"
          @click="goToSection('class-list')"
        >
          <span>🏫 Danh sách lớp</span>
        </button>

        <!-- Link nhanh đến danh sách môn học -->
        <button
          type="button"
          class="flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all border-b-2"
          :class="$route.path === '/' && $route.hash === '#subject-list'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'"
          @click="goToSection('subject-list')"
        >
          <span>📚 Danh mục môn học</span>
        </button>

        <!-- Link nhanh đến danh sách sinh viên tổng thể -->
        <button
          v-if="!$route.params.id"
          type="button"
          class="flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all border-b-2"
:class="($route.path === '/' && $route.hash === '#student-list')
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'"
          @click="goToDashboardStudentList"
        >
          <span>👥 Danh sách sinh viên</span>
        </button>

        <!-- Link tới danh sách sinh viên của lớp hiện tại -->
        <router-link
          v-if="$route.params.id"
          :to="`/class/${$route.params.id}/students`"
          class="flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all border-b-2"
          :class="$route.path === `/class/${$route.params.id}/students`
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'"
        >
          <span>👥 Danh sách sinh viên</span>
        </router-link>

        <!-- Hiển thị thông tin lớp khi đang ở trang chi tiết -->
        <div v-if="$route.params.id" class="flex items-center space-x-2 px-1 py-4 text-sm font-medium border-b-2 border-blue-600 text-blue-600 animate-fade-in">
          <span class="text-gray-300">|</span>
          <span class="ml-4">👤 Sinh viên lớp: {{ $route.params.id }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.animate-fade-in { animation: fadeIn 0.3s ease-in; }
@keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
</style>

<script setup>
import { nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToSection = async (sectionId) => {
  await router.push({ path: '/', hash: `#${sectionId}` })
  await nextTick()

  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goToDashboardStudentList = async () => {
  await router.push({ path: '/', hash: '#student-list' })
  await nextTick()

  const el = document.getElementById('student-list')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
