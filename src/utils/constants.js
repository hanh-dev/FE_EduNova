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

export {
  API_BASE_URL,
  api,
  DATE_FORMAT,
  STATUS,
  USER_ROLES,
};
