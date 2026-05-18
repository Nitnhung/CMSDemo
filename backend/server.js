import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import các file định tuyến (Routes Layer)
import classRoutes from './routes/classRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import studentSubjectsRoutes from './routes/studentSubjectsRoutes.js';


// Khởi tạo cấu hình dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép VueJS gọi API
app.use(express.json()); // Cho phép Express đọc dữ liệu dạng JSON từ request body

// Định nghĩa tiền tố đường dẫn (Prefix) cho API
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/student-subjects', studentSubjectsRoutes);


// Route kiểm tra hệ thống (Cổng chào)
app.get('/', (req, res) => {
  res.json({ message: 'Chào mừng bạn đến với API Hệ thống Quản lý Lớp học (CMS)!' });
});

// Lắng nghe cổng kết nối
app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});
