<template>
  <!-- Modal Wrapper -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">Thông tin chi tiết sinh viên</h3>
        <BaseButton variant="ghost" size="sm" @click="$emit('close')" class="text-xl">&times;</BaseButton>
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
            <div class="flex items-end gap-2">
              <div class="flex-1">
                <BaseSelect 
                  v-model="selectedSubjectId"
                  :options="availableSubjects.map(s => ({ label: `${s.name} (${s.code})`, value: s.id }))"
                  placeholder="-- Chọn môn học --"
                />
              </div>
              <BaseButton variant="primary" @click="handleAddSubject">Thêm</BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 border-t flex justify-end">
        <BaseButton variant="secondary" @click="$emit('close')">Đóng</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseSelect from '../base/BaseSelect.vue'

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