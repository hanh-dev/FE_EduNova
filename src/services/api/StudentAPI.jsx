import { API_BASE_URL } from "../../utils/constants";
import { api } from "../../utils/constants";

export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = (credentials) => api.post("/login", credentials);
export const profile = () => api.get('/profile');