<template>
  <!-- Modal Wrapper -->
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
          
          <div v-if="subjects && subjects.length" class="flex flex-wrap gap-2">
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

          <!-- Add Subject Section -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <h5 class="font-semibold text-gray-700 mb-2">Thêm môn học mới</h5>
            <div class="flex gap-2">
              <select v-model="selectedSubjectId" class="border border-gray-300 rounded-lg p-2 text-sm flex-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="">-- Chọn môn học --</option>
                <option v-for="sub in availableSubjects" :key="sub.id" :value="sub.id">
                  {{ sub.name }} ({{ sub.code }})
                </option>
              </select>
              <button 
                @click="handleAddSubject" 
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >Thêm</button>
            </div>
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
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  student: Object,
  subjects: {
    type: Array,
    default: () => []
  },
  allSubjects: { // Prop mới để nhận tất cả các môn học có thể thêm
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'addSubject'])

const selectedSubjectId = ref('')

// Computed property để lọc ra các môn học mà sinh viên chưa đăng ký
const availableSubjects = computed(() => {
  if (!props.allSubjects || !props.subjects) return []
  const studentSubjectIds = new Set(props.subjects.map(s => s.id))
  return props.allSubjects.filter(sub => !studentSubjectIds.has(sub.id))
})

const handleAddSubject = () => {
  if (selectedSubjectId.value) {
    emit('addSubject', props.student.id, Number(selectedSubjectId.value))
    selectedSubjectId.value = '' // Reset lựa chọn sau khi thêm
  } else {
    alert('Vui lòng chọn một môn học để thêm.')
  }
}
</script>