import { API_BASE_URL } from "../../utils/constants";
import { api } from "../../utils/constants";

export const getCourses = () => API_BASE_URL.get("/student/courses");
export const getFeedbacks = () => API_BASE_URL.get("/student/feedbacks");
export const getUser = () => api.get('/test');