import { getCollection, save, nextId } from '../utils/jsonStore.js'
import { updateStudentCount } from './classController.js'

export const getAllStudents = (req, res) => {
  try {
    res.json(getCollection('students'))
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sinh viên' })
  }
}

export const getStudentsByClass = (req, res) => {
  const classId = Number(req.params.classId)
  const students = getCollection('students')
  res.json(students.filter((s) => s.classId === classId))
}

export const createStudent = (req, res) => {
  const { studentCode, fullName, dob, gender, classId } = req.body
  if (!studentCode || !fullName || !dob || !gender || !classId) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ!' })
  }

  const students = getCollection('students')
  if (students.some((s) => s.studentCode === studentCode)) {
    return res.status(400).json({ message: 'MSSV đã tồn tại!' })
  }

  const id = nextId(students)
  const newStudent = {
    id,
    studentCode,
    fullName,
    dob,
    gender,
    classId: Number(classId),
  }
  students.push(newStudent)
  save('students')
  updateStudentCount(classId, 1)
  res.status(201).json({ message: 'Thêm sinh viên thành công!', data: newStudent })
}

export const updateStudent = (req, res) => {
  const id = Number(req.params.id)
  const { studentCode, fullName, dob, gender } = req.body
  const students = getCollection('students')
  const student = students.find((s) => s.id === id)
  if (!student) return res.status(404).json({ message: 'Không tìm thấy sinh viên!' })

  if (students.some((s) => s.studentCode === studentCode && s.id !== id)) {
    return res.status(400).json({ message: 'MSSV mới bị trùng với sinh viên khác!' })
  }

  student.studentCode = studentCode
  student.fullName = fullName
  student.dob = dob
  student.gender = gender
  save('students')
  res.json({ message: 'Cập nhật sinh viên thành công!', data: student })
}

export const deleteStudent = (req, res) => {
  const id = Number(req.params.id)
  const students = getCollection('students')
  const idx = students.findIndex((s) => s.id === id)
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy sinh viên!' })

  const { classId } = students[idx]
  students.splice(idx, 1)
  save('students')

  const links = getCollection('student_subjects')
  const filtered = links.filter((row) => row.studentId !== id)
  if (filtered.length !== links.length) {
    links.length = 0
    links.push(...filtered)
    save('student_subjects')
  }

  if (classId) updateStudentCount(classId, -1)
  res.json({ message: 'Xóa sinh viên thành công!' })
}
