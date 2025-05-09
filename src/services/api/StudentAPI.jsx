import { API_BASE_URL } from "../../utils/constants";
import { api } from "../../utils/constants";
// import { saveUser, setRefreshToken, setToken } from "../auth/authService";

export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");
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