import axios from "axios";
import { getToken } from "../services/auth/authService";

const API_BASE_URL = 'http://localhost:8000/api';

// Tạo instance của axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Gắn token nếu có
api.interceptors.request.use((config) => {
  const token = getToken();
  console.log("Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hằng số định nghĩa
const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

const DATE_FORMAT = 'YYYY-MM-DD';

// Hàm gọi API để tạo mục tiêu (goal)
const createGoal = async (goalData) => {
  try {
    const response = await api.post("/goal", goalData);
    console.log("Goal created:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API error:", error.response.data);
    } else if (error.request) {
      console.error("No response:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

// Hàm gọi API để chỉnh sửa mục tiêu (edit goal)
const editGoal = async (goalId, goalData) => {
  try {
    // Gửi yêu cầu PUT để cập nhật mục tiêu với goalId và goalData
    const response = await api.put(`/goal/${goalId}`, goalData);

    // Log kết quả trả về từ API
    console.log("Goal updated:", response.data);
    return response.data;
  } catch (error) {
    // Xử lý lỗi khi có phản hồi từ API
    if (error.response) {
      console.error("API error:", error.response.data);  // Lỗi từ API (response error)
    } 
    // Xử lý lỗi khi không nhận được phản hồi từ API
    else if (error.request) {
      console.error("No response from server:", error.request);  // Không có phản hồi từ server
    } 
    // Xử lý lỗi khác
    else {
      console.error("Unexpected error:", error.message);  // Lỗi bất ngờ
    }

    // Ném lại lỗi để người gọi có thể xử lý
    throw error;
  }
};


export {
  API_BASE_URL,
  api,
  DATE_FORMAT,
  STATUS,
  USER_ROLES,
  createGoal,
  editGoal // Xuất hàm editGoal
};
