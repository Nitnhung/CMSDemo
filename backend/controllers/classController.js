import { getCollection, save, nextId } from '../utils/jsonStore.js'

export const getAllClasses = (req, res) => {
  try {
    res.json(getCollection('classes'))
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách lớp học' })
  }
}

export const createClass = (req, res) => {
  const { code, name, startTime, endTime } = req.body
  if (!code || !name || !startTime || !endTime) return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' })

  const classes = getCollection('classes')
  if (classes.some((c) => c.code.toLowerCase() === code.toLowerCase())) {
    return res.status(400).json({ message: 'Mã lớp học này đã tồn tại!' })
  }

  const id = nextId(classes)
  const newClass = { id, code, name, startTime, endTime, studentCount: 0 }
  classes.push(newClass)
  save('classes')
  res.status(201).json({ message: 'Tạo lớp học thành công!', data: newClass })
}

export const updateClass = (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID lớp không hợp lệ!' })
  const { code, name, startTime, endTime } = req.body
  const classes = getCollection('classes')
  const target = classes.find((c) => c.id === id)
  if (!target) return res.status(404).json({ message: 'Không tìm thấy lớp học!' })

  if (classes.some((c) => c.code.toLowerCase() === code.toLowerCase() && c.id !== id)) {
    return res.status(400).json({ message: 'Mã lớp mới bị trùng với lớp khác!' })
  }

  target.code = code
  target.name = name
  target.startTime = startTime
  target.endTime = endTime
  save('classes')
  res.json({ message: 'Cập nhật thông tin lớp thành công!', data: { id, code, name, startTime, endTime, studentCount: target.studentCount } })
}

export const deleteClass = (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID lớp không hợp lệ!' })
  const classes = getCollection('classes')
  const idx = classes.findIndex((c) => c.id === id)
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy lớp học!' })

  classes.splice(idx, 1)
  save('classes')
  res.json({ message: 'Xóa lớp học thành công!' })
}

export const updateStudentCount = (classId, amount) => {
  const classes = getCollection('classes')
  const target = classes.find((c) => c.id === Number(classId))
  if (target) {
    target.studentCount += amount
    save('classes')
  }
}
