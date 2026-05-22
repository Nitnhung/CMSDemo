<!-- Đã di chuyển từ src/views sang src/layouts -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span class="text-xl font-bold text-gray-800 tracking-tight">CMS Portal</span>
        </div>
        <nav class="hidden md:flex gap-6">
          <router-link to="/" class="text-sm font-medium text-gray-600 hover:text-blue-600">Bảng điều khiển</router-link>
        </nav>
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-xs font-semibold text-gray-900">Admin User</p>
            <p class="text-[10px] text-gray-500">Quản trị viên</p>
          </div>
          <div class="w-9 h-9 rounded-full bg-gray-200 border border-gray-300"></div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
      <slot />
      <router-view v-if="!$slots.default" />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; 2024 Classroom Management System. Built with Vue 3 & Express.
      </div>
    </footer>
  </div>
</template>

<script setup></script>