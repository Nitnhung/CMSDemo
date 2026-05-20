import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import studentService from '../services/studentService'
import studentSubjectApi from '../api/student-subjects'

export function useClassDetail() {
  const route = useRoute()
  const currentClassId = computed(() => Number(route.params.id))

  const showStudentModal = ref(false)
  const showInfoModal = ref(false)
  const studentsList = ref([])
  const studentSubjects = ref([])
  const selectedStudent = ref(null)
  const infoStudent = ref(null)

  const fetchStudents = async () => {
    if (!currentClassId.value || Number.isNaN(currentClassId.value)) return
    try {
      const response = await studentService.getByClass(currentClassId.value)
      studentsList.value = response.data || []
    } catch (error) {
      console.error('Lỗi tải danh sách sinh viên:', error)
      studentsList.value = []
    }
  }

  watch(() => route.params.id, fetchStudents, { immediate: true })

  const openModalForCreate = () => {
    selectedStudent.value = { classId: currentClassId.value }
    showStudentModal.value = true
  }

  const openModalForEdit = (student) => {
    selectedStudent.value = student
    showStudentModal.value = true
  }

  const openInfoModal = async (student) => {
    infoStudent.value = student
    studentSubjects.value = []
    try {
      const response = await studentSubjectApi.getByStudent(student.id)
      studentSubjects.value = response.data || []
    } catch (error) {
      console.error('Lỗi tải môn học của sinh viên:', error)
    }
    showInfoModal.value = true
  }

  const handleStudentSubmit = async (formData) => {
    try {
      const response = (selectedStudent.value && selectedStudent.value.id)
        ? await studentService.update(selectedStudent.value.id, formData)
        : await studentService.create({ ...formData, classId: currentClassId.value });

      alert(response.data.message);
      fetchStudents()
      showStudentModal.value = false
    } catch (error) {
      alert(error.response?.data?.message || "Thao tác thất bại!")
    }
  }

  const handleDeleteStudent = async (studentId) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên có MSSV: ${studentId} ra khỏi lớp không?`)) {
      try {
        const response = await studentService.delete(studentId)
        alert(response.data.message)
        await fetchStudents()
      } catch (error) {
        alert("Xóa sinh viên thất bại!")
      }
    }
  }

  return {
    currentClassId, showStudentModal, showInfoModal, studentsList, studentSubjects,
    selectedStudent, infoStudent,
    openModalForCreate, openModalForEdit, openInfoModal,
    handleStudentSubmit, fetchStudents, handleDeleteStudent
  }
}