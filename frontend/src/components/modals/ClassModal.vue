<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">
          {{ editData ? 'Chỉnh Sửa Lớp Học' : 'Thêm Lớp Học Mới' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <BaseInput v-model="formData.code" label="Mã lớp học" placeholder="Ví dụ: WD18301" required />
        <BaseInput v-model="formData.name" label="Tên lớp học" placeholder="Ví dụ: Lập trình Mobile" required />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-left">Môn học áp dụng</label>
          <select 
            v-model="formData.subjectId" 
            class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>-- Chọn môn học --</option>
            <option v-for="sub in subjects" :key="sub.id" :value="sub.id">
              {{ sub.name }} ({{ sub.code }})
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formData.startTime" label="Ngày bắt đầu" type="date" required />
          <BaseInput v-model="formData.endTime" label="Ngày kết thúc" type="date" required />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" @click="$emit('close')">Hủy</BaseButton>
          <BaseButton type="submit">{{ editData ? 'Cập nhật' : 'Tạo lớp' }}</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'

const props = defineProps({
  isOpen: Boolean,
  editData: Object,
  subjects: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['close', 'submit'])

const formData = reactive({ 
  code: '', 
  name: '', 
  startTime: '', 
  endTime: '', 
  subjectId: '' 
})

watch(() => [props.isOpen, props.editData], ([isOpen, editData]) => {
  if (isOpen) {
    if (editData) {
      formData.code = editData.code
      formData.name = editData.name
      formData.startTime = editData.startTime
      formData.endTime = editData.endTime
      formData.subjectId = editData.subjectId
    } else {
      Object.assign(formData, { code: '', name: '', startTime: '', endTime: '', subjectId: '' })
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...formData, subjectId: Number(formData.subjectId) })
}
</script>