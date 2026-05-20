<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 class="text-lg font-bold text-gray-800">{{ editData ? 'Cập nhật lớp học' : 'Thêm lớp học mới' }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">&times;</button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div class="space-y-1">
          <label class="text-xs font-bold text-gray-600 uppercase">Mã lớp học</label>
          <input v-model="form.code" type="text" placeholder="VD: CNTT-K15A" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-gray-600 uppercase">Tên lớp học</label>
          <input v-model="form.name" type="text" placeholder="VD: Công nghệ thông tin A" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-600 uppercase">Ngày bắt đầu</label>
            <input v-model="form.startTime" type="date" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-600 uppercase">Ngày kết thúc</label>
            <input v-model="form.endTime" type="date" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" @click="$emit('close')" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">Hủy</button>
          <button type="submit" class="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">Lưu dữ liệu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  editData: Object
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  code: '',
  name: '',
  startTime: '',
  endTime: ''
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.editData) {
      form.value = { ...props.editData }
    } else {
      form.value = { code: '', name: '', startTime: '', endTime: '' }
    }
  }
})

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>