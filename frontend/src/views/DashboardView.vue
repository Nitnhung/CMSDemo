<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Bảng điều khiển tổng quan</h2>
        <p class="text-sm text-gray-500">Quản lý danh sách lớp học và chương trình môn học</p>
      </div>
      <div class="flex gap-3">
        <button @click="openStudentModalForCreate" class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border text-sm">+ Thêm sinh viên</button>
        <button @click="openSubjectModalForCreate" class="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border text-sm">+ Thêm môn học</button>
        <button @click="openClassModalForCreate" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-sm">+ Thêm lớp học</button>
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
    <StudentInfoModal :isOpen="showInfoModal" :student="infoStudent" @close="showInfoModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClassModal from '../components/ClassModal.vue'
import SubjectModal from '../components/SubjectModal.vue'
import StudentModal from '../components/StudentModal.vue'
import StudentInfoModal from '../components/StudentInfoModal.vue'
import classService from '../services/classService'
import subjectService from '../services/subjectService'
import studentService from '../services/studentService'

const showClassModal = ref(false)
const showSubjectModal = ref(false)
const showStudentModal = ref(false)
const showInfoModal = ref(false)
const classesList = ref([])
const subjectsList = ref([])
const studentsList = ref([])

const selectedClass = ref(null)
const selectedSubject = ref(null)
const selectedStudent = ref(null)
const infoStudent = ref(null)

const loadData = async () => {
  try {
    // Gọi các API độc lập để tránh một lỗi làm hỏng toàn bộ trang
    const fetchClasses = classService.getAll().then(res => classesList.value = res.data).catch(err => console.error("Lỗi tải lớp học:", err));
    const fetchSubjects = subjectService.getAll().then(res => subjectsList.value = res.data).catch(err => console.error("Lỗi tải môn học:", err));
    const fetchStudents = studentService.getAll()
      .then(res => {
        studentsList.value = res.data || []
      })
      .catch(err => {
        console.error("Lỗi tải danh sách sinh viên:", err)
        studentsList.value = []
      });

    await Promise.allSettled([fetchClasses, fetchSubjects, fetchStudents]);
  } catch (error) { 
    console.error("Lỗi hệ thống khi tải dữ liệu:", error);
  }
}

onMounted(loadData)

// Logic điều phối Class Modal
const openClassModalForCreate = () => { selectedClass.value = null; showClassModal.value = true; }
const openClassModalForEdit = (item) => { selectedClass.value = item; showClassModal.value = true; }
const handleClassSubmit = async (data) => {
  try {
    if (selectedClass.value) {
      await classService.update(selectedClass.value.id, data)
    } else {
      await classService.create(data)
    }
    loadData(); showClassModal.value = false;
  } catch (err) { alert(err.response?.data?.message) }
}
const handleDeleteClass = async (id) => {
  if (confirm("Xóa lớp này sẽ ảnh hưởng dữ liệu, bạn chắc chắn chứ?")) {
    await classService.delete(id); loadData();
  }
}

// Logic điều phối Subject Modal
const openSubjectModalForCreate = () => { selectedSubject.value = null; showSubjectModal.value = true; }
const openSubjectModalForEdit = (item) => { selectedSubject.value = item; showSubjectModal.value = true; }
const handleSubjectSubmit = async (data) => {
  try {
    if (selectedSubject.value) {
      await subjectService.update(selectedSubject.value.id, data)
    } else {
      await subjectService.create(data)
    }
    loadData(); showSubjectModal.value = false;
  } catch (err) { alert(err.response?.data?.message) }
}
const handleDeleteSubject = async (id) => {
  if (confirm("Xác nhận xóa môn học này?")) {
    await subjectService.delete(id); loadData();
  }
}

// Logic điều phối Student Modal
const openStudentModalForCreate = () => { selectedStudent.value = null; showStudentModal.value = true; }
const openStudentModalForEdit = (student) => {
  selectedStudent.value = student
  showStudentModal.value = true
}
const handleStudentSubmit = async (formData) => {
  try {
    if (selectedStudent.value && selectedStudent.value.id) {
      // Logic UPDATE
      const response = await studentService.update(selectedStudent.value.id, {
        studentCode: formData.studentId,
        fullName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        classId: formData.classId // Ensure classId is passed for updates if needed, though studentService.update doesn't use it in backend
      })
      alert(response.data.message)
    } else {
      // Logic CREATE
      const response = await studentService.create({
        studentCode: formData.studentId, // Ánh xạ từ studentId trong Modal sang studentCode của Backend
        fullName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        classId: formData.classId
      })
      alert(response.data.message)
    }
    loadData(); showStudentModal.value = false;
  } catch (err) { alert(err.response?.data?.message || "Thao tác thất bại!") }
}

const handleDeleteStudent = async (studentId) => {
  if (confirm(`Bạn có chắc chắn muốn xóa sinh viên này không?`)) {
    try {
      const response = await studentService.delete(studentId)
      alert(response.data.message)
      loadData() // Reload danh sách
    } catch (error) {
      alert("Xóa sinh viên thất bại!")
    }
  }
}

const openInfoModal = (student) => {
  infoStudent.value = student
  showInfoModal.value = true
}
</script>