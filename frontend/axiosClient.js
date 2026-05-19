import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor xử lý response hoặc lỗi global
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bạn có thể xử lý lỗi 401 (unauthorized) hoặc log lỗi ở đây
    const message = error.response?.data?.message || 'Đã có lỗi hệ thống xảy ra';
    console.error('[API Error]:', message);
    return Promise.reject(error);
  }
);

export default axiosClient;