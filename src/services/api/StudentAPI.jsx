import { api } from "../../utils/constants";
export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");
export const login = (credentials) => api.post("/v1/login", credentials);
export const logout = () => api.post("/v1/logout");
export const profile = () => api.get('/profile');

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
export const getGoalsByStatus = async (status) => {
  try {
    console.log("Fetching goals with status:", status);
    const response = await api.get(`/goal/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch goals by status:", error);
    throw error;
  }
};

// Xử lý lỗi API
const handleApiError = (error) => {
  if (error.response) {
    console.error("API error:", error.response.data);
  } else if (error.request) {
    console.error("No response from server:", error.request);
  } else {
    console.error("Unexpected error:", error.message);
  }
};



