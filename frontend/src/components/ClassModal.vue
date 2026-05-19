<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">
          {{ editData ? 'Chỉnh Sửa Thông Tin Lớp Học' : 'Tạo Lớp Học Mới' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <BaseInput
          v-model="formData.code"
          label="Mã lớp học"
          placeholder="Ví dụ: CNTT-K15A"
          required
        />

        <BaseInput
          v-model="formData.name"
          label="Tên lớp học"
          placeholder="Ví dụ: Công nghệ thông tin K15A"
          required
        />

        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.startTime"
            label="Thời gian bắt đầu"
            type="date"
            required
          />
          <BaseInput
            v-model="formData.endTime"
            label="Thời gian kết thúc"
            type="date"
            required
          />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" @click="$emit('close')">
            Hủy
          </BaseButton>
          <BaseButton type="submit">
            {{ editData ? 'Cập nhật' : 'Tạo lớp học' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

// Định nghĩa nhận dữ liệu editData từ trang cha truyền vào
const props = defineProps({
  isOpen: Boolean,
  editData: Object
})
const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  code: '',
  name: '',
  startTime: '',
  endTime: ''
})

// Theo dõi biến isOpen và editData để tự động điền thông tin cũ vào Form
watch(() => [props.isOpen, props.editData], ([isOpen, editData]) => {
  if (isOpen) {
    if (editData) {
      // Nếu có dữ liệu sửa -> Điền dữ liệu cũ vào các ô input
      formData.code = editData.code
      formData.name = editData.name
      formData.startTime = editData.startTime ?? ''
      formData.endTime = editData.endTime ?? ''
    } else {
      // Nếu không có dữ liệu sửa -> Xóa trắng form để thêm mới
      formData.code = ''
      formData.name = ''
      formData.startTime = ''
      formData.endTime = ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>