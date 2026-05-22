<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">{{ editData ? 'Chỉnh Sửa Thông Tin Sinh Viên' : 'Thêm Sinh Viên Mới' }}</h3>
        <BaseButton variant="ghost" size="sm" @click="$emit('close')" class="text-xl">&times;</BaseButton>
      </div>
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <BaseInput 
          v-model="formData.studentCode" 
          label="Mã số sinh viên (MSSV)" 
          placeholder="Nhập MSSV..."
          required 
        />
        <BaseInput 
          v-model="formData.fullName" 
          label="Họ và tên" 
          placeholder="Nhập họ tên đầy đủ..."
          required 
        />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput 
            v-model="formData.dob" 
            type="date" 
            label="Ngày sinh" 
            required 
          />
          <BaseSelect 
            v-model="formData.gender" 
            label="Giới tính"
            :options="[{label: 'Nam', value: 'Nam'}, {label: 'Nữ', value: 'Nữ'}, {label: 'Khác', value: 'Khác'}]"
          />
        </div>
        <BaseSelect 
          v-model="formData.classId" 
          label="Lớp học"
          :disabled="disableClassSelection"
          :options="classes.map(c => ({ label: `${c.code} - ${c.name}`, value: c.id }))"
          required
        />
        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" @click="$emit('close')">Hủy</BaseButton>
          <BaseButton type="submit" variant="primary">
            {{ editData ? 'Cập nhật' : 'Thêm mới' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import classService from '../../services/classService'
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseSelect from '../base/BaseSelect.vue'

const props = defineProps({ isOpen: Boolean, editData: Object, disableClassSelection: Boolean })
const emit = defineEmits(['close', 'submit'])
const classes = reactive([])
const formData = reactive({ studentCode: '', fullName: '', dob: '', gender: 'Nam', classId: '' })

const loadClasses = async () => {
  try { const res = await classService.getAll(); classes.splice(0, classes.length, ...(res.data || [])) }
  catch (e) { classes.splice(0, classes.length) }
}

watch(() => [props.isOpen, props.editData], async ([isOpen, editData]) => {
  if (!isOpen) return
  await loadClasses()
  if (editData) {
    formData.studentCode = editData.studentCode; formData.fullName = editData.fullName; formData.dob = editData.dob; formData.gender = editData.gender; formData.classId = editData.classId ?? ''
  } else {
    formData.studentCode = ''; formData.fullName = ''; formData.dob = ''; formData.gender = 'Nam'; formData.classId = props.disableClassSelection ? (editData?.classId ?? '') : (classes.length ? classes[0].id : '')
  }
}, { immediate: true })
const handleSubmit = () => emit('submit', { ...formData })
</script>