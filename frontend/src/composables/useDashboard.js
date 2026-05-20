import { ref, onMounted } from 'vue'
import classService from '../services/classService' // Đúng khi file nằm trong src/composables/
import subjectService from '../services/subjectService'
import studentService from '../services/studentService'
import studentSubjectApi from '../api/student-subjects'

export function useDashboard() {
  const showClassModal = ref(false)
  const showSubjectModal = ref(false)
  const showStudentModal = ref(false)
  const showInfoModal = ref(false)
  const classesList = ref([])
  const subjectsList = ref([])
  const studentsList = ref([])
  const studentSubjects = ref([])
  const isLoading = ref(false)

  const selectedClass = ref(null)
  const selectedSubject = ref(null)
  const selectedStudent = ref(null)
  const infoStudent = ref(null)

  const loadData = async () => {
    isLoading.value = true
    try {
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
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadData)

  const openClassModalForCreate = () => { selectedClass.value = null; showClassModal.value = true; }
  const openClassModalForEdit = (item) => { selectedClass.value = item; showClassModal.value = true; }
  const handleClassSubmit = async (data) => {
    try {
      selectedClass.value 
        ? await classService.update(selectedClass.value.id, data) 
        : await classService.create(data);
        
      loadData(); showClassModal.value = false;
    } catch (err) { alert(err.response?.data?.message) }
  }
  const handleDeleteClass = async (id) => {
    if (confirm("Xóa lớp này sẽ ảnh hưởng dữ liệu, bạn chắc chắn chứ?")) {
      await classService.delete(id); loadData();
    }
  }

  const openSubjectModalForCreate = () => { selectedSubject.value = null; showSubjectModal.value = true; }
  const openSubjectModalForEdit = (item) => { selectedSubject.value = item; showSubjectModal.value = true; }
  const handleSubjectSubmit = async (data) => {
    try {
      selectedSubject.value 
        ? await subjectService.update(selectedSubject.value.id, data) 
        : await subjectService.create(data);

      loadData(); showSubjectModal.value = false;
    } catch (err) { alert(err.response?.data?.message) }
  }
  const handleDeleteSubject = async (id) => {
    if (confirm("Xác nhận xóa môn học này?")) {
      await subjectService.delete(id); loadData();
    }
  }

  const openStudentModalForCreate = () => { selectedStudent.value = null; showStudentModal.value = true; }
  const openStudentModalForEdit = (student) => { selectedStudent.value = student;  showStudentModal.value = true; }
  const handleStudentSubmit = async (formData) => {
    try {
      const response = (selectedStudent.value && selectedStudent.value.id)
        ? await studentService.update(selectedStudent.value.id, formData)
        : await studentService.create(formData);

      alert(response.data.message);
      loadData(); showStudentModal.value = false;
    } catch (err) { alert(err.response?.data?.message || "Thao tác thất bại!") }
  }

  const handleDeleteStudent = async (studentId) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên này không?`)) {
      try {
        const response = await studentService.delete(studentId)
        alert(response.data.message)
        loadData()
      } catch (error) {
        alert("Xóa sinh viên thất bại!")
      }
    }
  }

  const openInfoModal = async (student) => {
    // Đảm bảo reset dữ liệu cũ và gán student trước khi mở modal
    studentSubjects.value = []
    infoStudent.value = { ...student } 
    showInfoModal.value = true // Mở modal ngay để hiện loading (nếu có)

    try {
      const response = await studentSubjectApi.getByStudent(student.id)
      studentSubjects.value = response.data || []
    } catch (error) {
      console.error("Lỗi lấy danh sách môn học của sinh viên:", error)
    }
  }

  const addSubjectToStudent = async (studentId, subjectId) => {
    if (!subjectId) return alert("Vui lòng chọn một môn học!")
    try {
      const response = await studentSubjectApi.addSubject(studentId, subjectId)
      alert(response.data.message)
      
      // Sau khi thêm thành công, tải lại danh sách môn của sinh viên này để UI cập nhật
      const updated = await studentSubjectApi.getByStudent(studentId)
      studentSubjects.value = updated.data || []
    } catch (err) {
      alert(err.response?.data?.message || "Không thể thêm môn học")
    }
  }

  return {
    showClassModal, showSubjectModal, showStudentModal, showInfoModal,
    classesList, subjectsList, studentsList, studentSubjects,
    selectedClass, selectedSubject, selectedStudent, infoStudent,
    openClassModalForCreate, openClassModalForEdit, handleClassSubmit, handleDeleteClass,
    openSubjectModalForCreate, openSubjectModalForEdit, handleSubjectSubmit, handleDeleteSubject,
    openStudentModalForCreate, openStudentModalForEdit, handleStudentSubmit, handleDeleteStudent,
    openInfoModal, addSubjectToStudent
  }
}