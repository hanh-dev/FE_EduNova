import { api } from "../../utils/constants";

export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");
export const profile = () => api.get("/profile");
export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const getGoals = () => api.get("/goal");

// goal
export const createGoal = async (goalData) => {
  try {
    const response = await api.post("/goal", goalData);
    console.log("Goal created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getGoal = async (id) => {
  try {
    console.log("Fetching goal ID:", id);
    const response = await api.get(`/goal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get goal:", error);
    throw error;
  }
};

// Cập nhật mục tiêu theo ID
export const editGoal = async (id, updatedGoal) => {
  try {
    console.log("Updating goal ID:", id, updatedGoal);
    const response = await api.put(`/goal/${id}`, updatedGoal);
    
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to edit goal:", error);
    throw error;
  }
};


export const deleteGoal = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.delete(`/goal/${id}`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getAllGoal = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.get(`/goal`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};
// Xủ lí trạng thái 
export const updateGoalStatus = async (id, status) => {
  try {
    console.log("Updating goal status for ID:", id, "New Status:", status);
    // Cập nhật URL endpoint phù hợp với route mới
    const response = await api.put(`/goal/${id}/completeStatus`, { completeStatus: status });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to update goal status:", error);
    throw error;
  }
};

// Xử lý lỗi API
const handleApiError = (error) => {
  if (error.response) {
    // Có phản hồi từ server
    console.error("API error:", error.response.data);
  } else if (error.request) {
    // Không có phản hồi từ server
    console.error("No response from server:", error.request);
  } else {
    // Lỗi không xác định
    console.error("Unexpected error:", error.message);
  }
};



