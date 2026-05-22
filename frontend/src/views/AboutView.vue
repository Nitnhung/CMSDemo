<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto mb-8 flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Hệ thống Quản lý Lớp học (CMS)</h1>
        <p class="text-sm text-gray-500 mt-1">Tổng quan danh sách lớp học và quản lý môn học</p>
      </div>
      <div class="flex gap-3">
        <button 
          @click="showSubjectModal = true"
          class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm transition-all text-sm"
        >
          + Thêm môn học
        </button>
        <button 
          @click="showClassModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all text-sm"
        >
          + Thêm lớp học
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-lg font-bold text-gray-800">Danh sách các lớp học hiện tại</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b border-gray-100">
                <th class="px-6 py-4">Mã Lớp</th>
                <th class="px-6 py-4">Tên Lớp Học</th>
                <th class="px-6 py-4">Sĩ số</th>
                <th class="px-6 py-4">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-medium text-gray-900">CNTT-K15A</td>
                <td class="px-6 py-4">Công nghệ thông tin - Khóa 15 A</td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">45 sinh viên</span>
                </td>
                <td class="px-6 py-4">
                  <router-link 
                    to="/class/1" 
                    class="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    Xem chi tiết →
                  </router-link>
                </td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-medium text-gray-900">KHMT-K16B</td>
                <td class="px-6 py-4">Khoa học máy tính - Khóa 16 B</td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">38 sinh viên</span>
                </td>
                <td class="px-6 py-4">
                  <router-link 
                    to="/class/2" 
                    class="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    Xem chi tiết →
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showClassModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded-xl max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Form thêm lớp học (Sẽ code ở bước sau)</h3>
        <button @click="showClassModal = false" class="bg-gray-200 px-4 py-2 rounded-lg">Đóng</button>
      </div>
    </div>

    <div v-if="showSubjectModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded-xl max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Form thêm môn học (Sẽ code ở bước sau)</h3>
        <button @click="showSubjectModal = false" class="bg-gray-200 px-4 py-2 rounded-lg">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Quản lý trạng thái đóng/mở các popup Form mẫu bằng ref của Vue 3
const showClassModal = ref(false)
const showSubjectModal = ref(false)
</script>