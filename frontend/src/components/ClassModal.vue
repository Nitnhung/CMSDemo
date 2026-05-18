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
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã lớp học</label>
          <input 
            v-model="formData.code" 
            type="text" 
            placeholder="Ví dụ: CNTT-K15A" 
            class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500" 
            required 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên lớp học</label>
          <input v-model="formData.name" type="text" placeholder="Ví dụ: Công nghệ thông tin K15A" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian bắt đầu</label>
            <input
              v-model="formData.startTime"
              type="date"
              class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian kết thúc</label>
            <input
              v-model="formData.endTime"
              type="date"
              class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
        </div>


        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Hủy
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            {{ editData ? 'Cập nhật' : 'Tạo lớp học' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

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