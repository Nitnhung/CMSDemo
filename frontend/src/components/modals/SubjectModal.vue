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
        <BaseInput 
          v-model="formData.code" 
          label="Mã môn học" 
          placeholder="Ví dụ: WEB203" 
          required 
        />
        <BaseInput 
          v-model="formData.name" 
          label="Tên môn học" 
          placeholder="Ví dụ: Lập trình Web với VueJS" 
          required 
        />
        <BaseInput 
          v-model="formData.credits" 
          label="Số tín chỉ" 
          type="number" 
          min="1" max="10" 
          required 
        />

        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" @click="$emit('close')">
            Hủy
          </BaseButton>
          <BaseButton type="submit">
            {{ editData ? 'Cập nhật môn' : 'Thêm môn học' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseButton from '../BaseButton.vue'
import BaseInput from '../BaseInput.vue'

const props = defineProps({
  isOpen: Boolean,
  editData: Object
})
const emit = defineEmits(['close', 'submit'])

const formData = reactive({ code: '', name: '', credits: 3 })

watch(() => [props.isOpen, props.editData], ([isOpen, editData]) => {
  if (isOpen) {
    if (editData) { formData.code = editData.code; formData.name = editData.name; formData.credits = editData.credits }
    else { formData.code = ''; formData.name = ''; formData.credits = 3 }
  }
}, { immediate: true })
const handleSubmit = () => emit('submit', { ...formData })
</script>