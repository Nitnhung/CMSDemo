<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Lớp học: {{ currentClassId }}</h1>
        <p class="text-sm text-gray-500 mt-1">Quản lý hồ sơ, sửa đổi, xóa thông tin sinh viên</p>
      </div>
      <button @click="openModalForCreate" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-sm">+ Thêm sinh viên vào lớp</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b">
              <th class="px-6 py-3">MSSV</th>
              <th class="px-6 py-3">Họ và Tên</th>
              <th class="px-6 py-3">Ngày sinh</th>
              <th class="px-6 py-3">Chi tiết</th>
              <th class="px-6 py-3">Giới tính</th>
              <th class="px-6 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="student in studentsList" :key="student.id">
              <td class="px-6 py-4 font-mono font-medium text-blue-600">{{ student.studentCode }}</td> 
              <td class="px-6 py-4 font-medium text-gray-900">{{ student.fullName }}</td>
              <td class="px-6 py-4 text-gray-600">{{ student.dob }}</td>
              <td class="px-6 py-4">
                <button @click="openInfoModal(student)" class="text-blue-600 hover:text-blue-800 font-medium">Xem chi tiết</button>
              </td>
              <td class="px-6 py-4">
                <span :class="student.gender === 'Nam' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'" class="px-2.5 py-1 rounded-full text-xs font-medium">{{ student.gender }}</span>
              </td>
              
              <td class="px-6 py-4 text-right space-x-3">
                <button @click="openModalForEdit(student)" class="text-amber-600 hover:underline">Sửa</button>
                <button @click="handleDeleteStudent(student.id)" class="text-red-600 hover:underline">Xóa</button> 
              </td>
            </tr>
            <tr v-if="studentsList.length === 0"><td colspan="5" class="px-6 py-8 text-center text-gray-400 italic">Chưa có sinh viên nào.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <StudentModal :isOpen="showStudentModal" :editData="selectedStudent" :disableClassSelection="!!selectedStudent && !selectedStudent.id && selectedStudent.classId" @close="showStudentModal = false" @submit="handleStudentSubmit" />
    <StudentInfoModal :isOpen="showInfoModal" :student="infoStudent" @close="showInfoModal = false" />
  </div>
</template>

<script setup>
import StudentModal from '../components/modals/StudentModal.vue'
import StudentInfoModal from '../components/modals/StudentInfoModal.vue'
import { useClassDetail } from '../composables/useClassDetail'

const {
  currentClassId, showStudentModal, showInfoModal, studentsList,
  selectedStudent, infoStudent,
  openModalForCreate, openModalForEdit, openInfoModal,
  handleStudentSubmit, fetchStudents, handleDeleteStudent
} = useClassDetail()
</script>