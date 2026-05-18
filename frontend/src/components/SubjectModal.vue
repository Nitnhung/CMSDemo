<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">
          {{ editData ? 'Chỉnh Sửa Môn Học' : 'Thêm Môn Học Mới' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã môn học</label>
          <input 
            v-model="formData.code" 
            type="text" 
            placeholder="Ví dụ: WEB203" 
            class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500" 
            required 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên môn học</label>
          <input v-model="formData.name" type="text" placeholder="Ví dụ: Lập trình Web với VueJS" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Số tín chỉ</label>
          <input v-model="formData.credits" type="number" min="1" max="10" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Hủy
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            {{ editData ? 'Cập nhật môn' : 'Thêm môn học' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  editData: Object
})
const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  code: '',
  name: '',
  credits: 3
})

watch(() => [props.isOpen, props.editData], ([isOpen, editData]) => {
  if (isOpen) {
    if (editData) {
      formData.code = editData.code
      formData.name = editData.name
      formData.credits = editData.credits
    } else {
      formData.code = ''
      formData.name = ''
      formData.credits = 3
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>