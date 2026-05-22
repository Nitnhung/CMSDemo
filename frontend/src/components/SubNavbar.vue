<template>
  <nav class="bg-white border-b border-gray-200 sticky top-16 z-20 overflow-x-auto no-scrollbar">
    <div class="max-w-7xl mx-auto px-4 flex gap-8">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        @click="scrollTo(item.id)"
        class="py-4 text-sm font-semibold text-gray-500 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap transition-all"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
const navItems = [
  { id: 'class-list', label: 'Danh sách Lớp học' },
  { id: 'subject-list', label: 'Danh mục Môn học' },
  { id: 'student-list', label: 'Quản lý Sinh viên' }
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>