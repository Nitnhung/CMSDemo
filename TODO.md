# TODO

## Frontend refactor: tách service -> folder service và folder api (mỗi api tạo một index.js)

- [ ] B1: Tạo `frontend/src/api/` và `frontend/src/api/client.js` (từ nội dung `frontend/src/services/api.js`).
- [ ] B2: Tạo API modules (mỗi resource có 1 `index.js`):
  - [ ] `frontend/src/api/classes/index.js`
  - [ ] `frontend/src/api/students/index.js`
  - [ ] `frontend/src/api/subjects/index.js`
  - [ ] `frontend/src/api/student-subjects/index.js`
- [ ] B3: Cập nhật service layer để import từ api modules:
  - [ ] `frontend/src/services/classService.js`
  - [ ] `frontend/src/services/studentService.js`
  - [ ] `frontend/src/services/subjectService.js`
  - [ ] `frontend/src/services/studentSubjectsService.js`
- [ ] B4: Cập nhật/giữ `frontend/src/services/api.js` theo hướng không còn là axios client (để tránh double source) — hoặc xóa nếu không còn import.
- [ ] B5: Search toàn project để đảm bảo không còn import cũ sai đường dẫn.
- [ ] B6: Chạy build/dev để confirm không lỗi.

