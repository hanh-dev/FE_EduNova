import { api } from "../../utils/constants";
// User Authentication
const getCourses = () => api.get("/student/courses");
const getFeedbacks = () => api.get("/student/feedbacks");
const login = (credentials) => api.post("/v1/login", credentials);
const logout = () => api.post("/v1/logout");
const profile = () => api.get('/profile');
// Admin class management
const getClasses = async() => {
    try {
        const reponse = await api.get('/v1/classes');
        return reponse.data;
    } catch (error) {
        console.error("Error at fetching class data: ", error);
        return [];
    }
}

const getNameOfTeachers = async () => {
    try {
        const response = await api.get('/v1/teachers');
        return response.data;
    } catch (error) {
        console.error("Error at fetching teacher data", error);
        return [];
    }
}

const createClass = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.className);
      formData.append("teacherName", data.teacherName);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      formData.append("students", JSON.stringify(data.students));

      const response = await api.post('/v1/classes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Test data: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create class", error);
      throw error;
    }
}

const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/v1/classes/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to delete class", error);
    throw error;
  }
}

const updateClass = async (id, data) => {
  try {
    const response = await api.patch(`/v1/classes/${id}`, data);
    console.log("Test response update:", response.data);
    return response.data;
  } catch (error) {
    console.log("Failed to update class", error);
    throw error;
  }
};


export {getClasses, getNameOfTeachers, createClass, getCourses, getFeedbacks, login, logout, profile, deleteClass, updateClass}