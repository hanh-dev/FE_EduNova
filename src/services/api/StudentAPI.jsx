import { API_BASE_URL } from "../../utils/constants";
import { api } from "../../utils/constants";
import axios from 'axios';

export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");
export const profile = () => api.get('/profile');

export const academyAPI = {
    getAllAcademies: async () => {
        const response = await api.get(`/academies`);
        return response.data;
    },

    getAcademy: async (id) => {
        const response = await api.get(`/academies/${id}`);
        return response.data;
    },

    addAcademy: async (formData) => {
        const response = await api.post(`/academies`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateAcademy: async (id, formData) => {
        formData.append("_method", "PUT");
        const response = await api.post(`/academies/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: { _method: 'PUT' },
        });
        return response.data;
    },

    deleteAcademy: async (id) => {
        await api.delete(`/academies/${id}`);
        return true;
    },
}

export default academyAPI;