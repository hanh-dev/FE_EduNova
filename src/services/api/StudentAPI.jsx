import api from "./config";
import { API_BASE_URL } from "../../utils/constants";

export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = () => API_BASE_URL.post("/login");