import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import studentService from '../services/studentService'
import studentSubjectsService from '../services/studentSubjectsService'

export function useStudentDetail() {
  const route = useRoute()
  const currentClassId = computed(() => Number(route.params.id)) 
  //dùng computed để currentClassId được load ngay sau khi component/composable được khởi tạo và nó sẽ luôn thay đổi theo URL khi URL thay đổi
  const studentsList = ref([])
  const isLoading = ref(false)

  const loadStudentsAndSubjects = async () => {
    if (!currentClassId.value) return
    isLoading.value = true
    try {
      const res = await studentService.getByClass(currentClassId.value)
      const students = res.data || []

      const enriched = await Promise.all(
        students.map(async (student) => {
          try {
            const rs = await studentSubjectsService.getByStudent(student.id)
            return { ...student, subjects: rs.data }
          } catch {
            return { ...student, subjects: [] }
          }
        })
      )
      studentsList.value = enriched
    } catch (error) {
      console.error('Lỗi tải danh sách sinh viên:', error)
      studentsList.value = []
    } finally {
      isLoading.value = false
    }
  }

  watch(() => route.params.id, loadStudentsAndSubjects, { immediate: true })

  return { currentClassId, studentsList, isLoading }
}