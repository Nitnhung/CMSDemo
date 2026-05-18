<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Danh sách sinh viên lớp: {{ currentClassId }}</h2>
        <p class="text-sm text-gray-500 mt-1">MSSV, Họ và tên, Ngày sinh, Giới tính, và các môn đang học</p>
      </div>
    </div>

    <div id="student-list" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
      <div class="p-5 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">Danh sách sinh viên</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b">
              <th class="px-6 py-3">MSSV</th>
              <th class="px-6 py-3">Họ và Tên</th>
              <th class="px-6 py-3">Ngày sinh</th>
              <th class="px-6 py-3">Giới tính</th>
              <th class="px-6 py-3">Môn đang học</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-8 text-center">
                <div class="flex justify-center items-center gap-2 text-blue-600"><span class="animate-spin text-xl">⏳</span> Đang tải dữ liệu...</div>
              </td>
            </tr>
            <template v-else v-for="student in studentsList" :key="student.id">
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-mono font-medium text-blue-600">{{ student.studentCode }}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ student.fullName }}</td>
                <td class="px-6 py-4 text-gray-600">{{ student.dob }}</td>
                <td class="px-6 py-4">
                  <span
                    :class="student.gender === 'Nam' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'"
                    class="px-2.5 py-1 rounded-full text-xs font-medium"
                  >
                    {{ student.gender }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div v-if="student.subjects && student.subjects.length" class="flex flex-wrap gap-2">
                    <span
                      v-for="sub in student.subjects"
                      :key="sub.id"
                      class="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {{ sub.code }}
                    </span>
                  </div>
                  <span v-else class="text-gray-400 italic">Chưa có môn</span>
                </td>
              </tr>
            </template>

            <tr v-if="!isLoading && studentsList.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-400 italic">Chưa có sinh viên nào.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import studentService from '../services/studentService'
import studentSubjectsService from '../services/studentSubjectsService'

const route = useRoute()
const currentClassId = computed(() => route.params.id)

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
</script>
