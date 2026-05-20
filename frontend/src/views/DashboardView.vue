<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Bảng điều khiển tổng quan</h2>
        <p class="text-sm text-gray-500">Quản lý danh sách lớp học và chương trình môn học</p>
      </div>
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="openStudentModalForCreate">+ Thêm sinh viên</BaseButton>
        <BaseButton variant="secondary" @click="openSubjectModalForCreate">+ Thêm môn học</BaseButton>
        <BaseButton variant="primary" @click="openClassModalForCreate">+ Thêm lớp học</BaseButton>
      </div>
    </div>

    <div id="class-list" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
      <div class="p-5 border-b border-gray-100"><h3 class="font-bold text-gray-800">Danh sách các lớp học hiện tại</h3></div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b"><th class="px-6 py-3">Mã Lớp</th><th class="px-6 py-3">Tên Lớp Học</th><th class="px-6 py-3">Sĩ số</th><th class="px-6 py-3">Thời gian bắt đầu</th><th class="px-6 py-3">Thời gian kết thúc</th><th class="px-6 py-3 text-right">Hành động</th></tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="c in classesList" :key="c.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-semibold text-gray-900">{{ c.code }}</td>
              <td class="px-6 py-4">{{ c.name }}</td>
              <td class="px-6 py-4"><span class="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">{{ c.studentCount }} sinh viên</span></td>
              <td class="px-6 py-4">{{ c.startTime || '-' }}</td>
              <td class="px-6 py-4">{{ c.endTime || '-' }}</td>
              <td class="px-6 py-4 text-right space-x-3">
                <router-link :to="'/class/' + c.id" class="text-blue-600 hover:underline">Chi tiết →</router-link>
                <button @click="openClassModalForEdit(c)" class="text-amber-600 hover:underline">Sửa</button>
                <button @click="handleDeleteClass(c.id)" class="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="subject-list" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
      <div class="p-5 border-b border-gray-100"><h3 class="font-bold text-gray-800">Danh mục các môn học</h3></div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b"><th class="px-6 py-3">Mã Môn</th><th class="px-6 py-3">Tên Môn Học</th><th class="px-6 py-3">Số Tín Chỉ</th><th class="px-6 py-3 text-right">Hành động</th></tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="s in subjectsList" :key="s.code" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-mono text-blue-600 font-semibold">{{ s.code }}</td>
              <td class="px-6 py-4 text-gray-900 font-medium">{{ s.name }}</td>
              <td class="px-6 py-4">{{ s.credits }} tín chỉ</td>
              <td class="px-6 py-4 text-right space-x-3">
                <button @click="openSubjectModalForEdit(s)" class="text-amber-600 hover:underline">Sửa</button>
                <button @click="handleDeleteSubject(s.id)" class="text-red-600 hover:underline">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="student-list" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
      <div class="p-5 border-b border-gray-100"><h3 class="font-bold text-gray-800">Toàn bộ sinh viên hệ thống</h3></div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b">
              <th class="px-6 py-3">MSSV</th>
              <th class="px-6 py-3">Họ và Tên</th>
              <th class="px-6 py-3">Giới tính</th>
              <th class="px-6 py-3">Ngày sinh</th>
              <th class="px-6 py-3">Chi tiết</th> 
              <th class="px-6 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="st in studentsList" :key="st.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-mono text-blue-600 font-medium">{{ st.studentCode }}</td>
              <td class="px-6 py-4 text-gray-900">{{ st.fullName }}</td>
              <td class="px-6 py-4">
                <span :class="st.gender === 'Nam' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'" class="px-2.5 py-1 rounded-full text-xs font-medium">{{ st.gender }}</span>
              </td>
              <td class="px-6 py-4 text-gray-500">{{ st.dob }}</td>
              <td class="px-6 py-4">
                <button @click="openInfoModal(st)" class="text-blue-600 hover:text-blue-800 font-medium">Xem chi tiết</button>
              </td> 
              <td class="px-6 py-4 text-right space-x-3">
                <button @click="openStudentModalForEdit(st)" class="text-amber-600 hover:underline">Sửa</button>
                <button @click="handleDeleteStudent(st.id)" class="text-red-600 hover:underline">Xóa</button>
              </td>              
            </tr>
            <tr v-if="studentsList.length === 0"><td colspan="4" class="px-6 py-8 text-center text-gray-400 italic">Chưa có dữ liệu sinh viên.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <ClassModal :isOpen="showClassModal" :editData="selectedClass" @close="showClassModal = false" @submit="handleClassSubmit" />
    <SubjectModal :isOpen="showSubjectModal" :editData="selectedSubject" @close="showSubjectModal = false" @submit="handleSubjectSubmit" />
    <StudentModal :isOpen="showStudentModal" :editData="selectedStudent" @close="showStudentModal = false" @submit="handleStudentSubmit" />
    <StudentInfoModal 
      :isOpen="showInfoModal" 
      :student="infoStudent" 
      :subjects="studentSubjects" 
      :all-subjects="subjectsList"
      @close="showInfoModal = false" 
      @add-subject="addSubjectToStudent"
    />
  </div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue'
import ClassModal from '../components/modals/ClassModal.vue'
import SubjectModal from '../components/modals/SubjectModal.vue'
import StudentModal from '../components/modals/StudentModal.vue'
import StudentInfoModal from '../components/modals/StudentInfoModal.vue'
import { useDashboard } from '../composables/useDashboard'

const {
  showClassModal,
  showSubjectModal,
  showStudentModal,
  showInfoModal,
  classesList,
  subjectsList,
  studentsList,
  studentSubjects,
  selectedClass,
  selectedSubject,
  selectedStudent,
  infoStudent,
  openClassModalForCreate,
  openClassModalForEdit,
  handleClassSubmit,
  handleDeleteClass,
  openSubjectModalForCreate,
  openSubjectModalForEdit,
  handleSubjectSubmit,
  handleDeleteSubject,
  openStudentModalForCreate,
  openStudentModalForEdit,
  handleStudentSubmit,
  handleDeleteStudent,
    openInfoModal,
    addSubjectToStudent
} = useDashboard()
</script>