import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')

const DEFAULTS = {
  classes: [
    { id: 1, code: 'CNTT-K15A', name: 'Công nghệ thông tin - Khóa 15 A', studentCount: 2 },
    { id: 2, code: 'KHMT-K16B', name: 'Khoa học máy tính - Khóa 16 B', studentCount: 0 },
  ],
  students: [
    { id: 1, studentCode: '20240001', fullName: 'Nguyễn Văn An', dob: '2003-05-15', gender: 'Nam', classId: 1 },
    { id: 2, studentCode: '20240002', fullName: 'Trần Thị Bình', dob: '2003-10-20', gender: 'Nữ', classId: 1 },
  ],
  subjects: [
    { id: 1, code: 'MAD101', name: 'Toán rời rạc', credits: 3 },
    { id: 2, code: 'WEB203', name: 'Lập trình Web với VueJS', credits: 4 },
  ],
  student_subjects: [
    { studentId: 1, subjectId: 1 },
    { studentId: 1, subjectId: 2 },
    { studentId: 2, subjectId: 2 },
  ],
}

const state = {
  classes: null,
  students: null,
  subjects: null,
  student_subjects: null,
}

function filePath(key) {
  return path.join(DATA_DIR, `${key}.json`)
}

function readDisk(key) {
  const p = filePath(key)
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}

function writeDisk(key, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(filePath(key), JSON.stringify(data, null, 2), 'utf8')
}

function ensure(key) {
  if (state[key] === null) {
    const fromDisk = readDisk(key)
    state[key] = Array.isArray(fromDisk) ? fromDisk : structuredClone(DEFAULTS[key])
    if (!fromDisk) writeDisk(key, state[key])
  }
  return state[key]
}

/** @param {'classes'|'students'|'subjects'|'student_subjects'} key */
export function getCollection(key) {
  return ensure(key)
}

/** @param {'classes'|'students'|'subjects'|'student_subjects'} key */
export function save(key) {
  ensure(key)
  writeDisk(key, state[key])
}

export function nextId(items) {
  if (!items.length) return 1
  return Math.max(...items.map((x) => x.id)) + 1
}
