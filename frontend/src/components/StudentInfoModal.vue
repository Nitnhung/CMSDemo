<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">Thông tin chi tiết sinh viên</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4 text-sm">
        <div class="space-y-3">
          <div class="flex justify-between border-b border-gray-50 pb-2">
            <span class="text-gray-500">Mã số sinh viên:</span>
            <span class="font-mono font-bold text-blue-600">{{ student?.studentCode }}</span>
          </div>
          <div class="flex justify-between border-b border-gray-50 pb-2">
            <span class="text-gray-500">Họ và tên:</span>
            <span class="font-semibold text-gray-800">{{ student?.fullName }}</span>
          </div>
          <div class="flex justify-between border-b border-gray-50 pb-2">
            <span class="text-gray-500">Giới tính:</span>
            <span :class="student?.gender === 'Nam' ? 'text-blue-600' : 'text-pink-600'" class="font-medium">
              {{ student?.gender }}
            </span>
          </div>
          <div class="flex justify-between border-b border-gray-50 pb-2">
            <span class="text-gray-500">Ngày sinh:</span>
            <span class="text-gray-700">{{ student?.dob }}</span>
          </div>
        </div>

        <!-- Subjects Section -->
        <div class="mt-6">
          <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📚 Các môn đang học</span>
          </h4>
          
          <div v-if="loading" class="flex items-center justify-center py-4">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else-if="subjects.length" class="flex flex-wrap gap-2">
            <span 
              v-for="sub in subjects" 
              :key="sub.id" 
              class="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
            >
              {{ sub.name }} ({{ sub.code }})
            </span>
          </div>
          
          <div v-else class="text-center py-4 bg-gray-50 rounded-lg text-gray-400 italic">
            Chưa đăng ký môn học nào
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 border-t flex justify-end">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import studentSubjectsService from '../services/studentSubjectsService'

const props = defineProps({
  isOpen: Boolean,
  student: Object
})

defineEmits(['close'])

const subjects = ref([])
const loading = ref(false)

watch(
  () => [props.isOpen, props.student?.id],
  async ([isOpen, studentId]) => {
    if (!isOpen) {
      subjects.value = []
      loading.value = false
      return
    }

    if (!studentId) return

    subjects.value = []
    loading.value = true
    try {
      const response = await studentSubjectsService.getByStudent(studentId)
      subjects.value = response.data || []
    } catch (error) {
      console.error('Lỗi khi tải môn học của sinh viên:', error)
      subjects.value = []
    } finally {
      loading.value = false
    }
  }
)
</script>