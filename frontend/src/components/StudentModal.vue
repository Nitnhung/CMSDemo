<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">
          {{ editData ? 'Chỉnh Sửa Thông Tin Sinh Viên' : 'Thêm Sinh Viên Mới' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã số sinh viên (MSSV)</label>
          <input
            v-model="formData.studentId"
            type="text"
            class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input v-model="formData.fullName" type="text" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <input v-model="formData.dob" type="date" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <select
              v-model="formData.gender"
              class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lớp học</label>
<select
            v-model="formData.classId"
            :disabled="disableClassSelection"
            class="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
            required
          >
            <option disabled value="">Chọn lớp...</option>
            <option v-for="c in classes" :key="c.id" :value="c.id">
              {{ c.code }} - {{ c.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Hủy
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            {{ editData ? 'Cập nhật sinh viên' : 'Thêm sinh viên' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import classService from '../services/classService'

const props = defineProps({
  isOpen: Boolean,
  editData: Object,
  disableClassSelection: Boolean
})
const emit = defineEmits(['close', 'submit'])

const classes = reactive([])

const formData = reactive({
  studentId: '',
  fullName: '',
  dob: '',
  gender: 'Nam',
  classId: ''
})

const loadClasses = async () => {
  try {
    const res = await classService.getAll()
    classes.splice(0, classes.length, ...(res.data || []))
  } catch (e) {
    classes.splice(0, classes.length)
  }
}

watch(
  () => [props.isOpen, props.editData],
  async ([isOpen, editData]) => {
    if (!isOpen) return

    await loadClasses()

    if (editData) {
      formData.studentId = editData.studentCode
      formData.fullName = editData.fullName
      formData.dob = editData.dob
      formData.gender = editData.gender
      formData.classId = editData.classId ?? ''
    } else {
      formData.studentId = ''
      formData.fullName = ''
      formData.dob = ''
      formData.gender = 'Nam'
      formData.classId = props.disableClassSelection ? (editData?.classId ?? '') : (classes.length ? classes[0].id : '')
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

