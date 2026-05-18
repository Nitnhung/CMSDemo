<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-700 text-white shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🏫</span>
          <h1 class="text-xl font-bold tracking-wide">CMS - Classroom Management</h1>
        </div>
        <div class="flex items-center gap-4 text-sm font-medium">
          <router-link to="/" class="hover:text-blue-200 transition-colors">Dashboard</router-link>
          <span class="text-blue-400">|</span>
          <span class="bg-blue-800 px-3 py-1.5 rounded-lg text-xs">Quyền: Admin</span>
        </div>
      </div>
    </header>

    <!-- Sub navigation appears on all pages (layout wrapper) -->
    <SubNavbar />

    <main class="flex-1 max-w-7xl w-full mx-auto p-6">
      <RouterView />
    </main>

    <footer class="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-500">
      &copy; 2026 - Hệ thống quản lý lớp học (Vue 3 + Node.js)
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SubNavbar from './SubNavbar.vue'
</script>
