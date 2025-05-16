import { API_BASE_URL } from "../../utils/constants";
import { api } from "../../utils/constants";
// import { saveUser, setRefreshToken, setToken } from "../auth/authService";

export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = (credentials) => api.post("/v1/login", credentials);
export const logout = () => api.post("/v1/logout");
export const profile = () => api.get('/profile');


// const login = async (credentials) => {
//     try {
//         const response = await api.post("/login", credentials);
//         const {access_token, refresh_token, user} = response.data;
//         saveUser(user, access_token, refresh_token);
//         setToken(access_token);
//         setRefreshToken(refresh_token);
//         return {user.username, role, access_token}
        
//     } catch (error) {
//         console.error("Erorr login!", error);
//     }
// }

// const logout = async() => {
//     try {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('user');
//     } catch (error) {
//         console.error("Erorr at logout!", error);
//     }
// }

// export {login, logout}

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


export {getClasses, getNameOfTeachers, createClass}