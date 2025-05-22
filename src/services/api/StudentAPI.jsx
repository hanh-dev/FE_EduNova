import { api } from "../../utils/constants";

// =========================
// 🔐 Authentication
// =========================
export const login = (credentials) => api.post("/v1/login", credentials);
export const logout = () => api.post("/v1/logout");
export const profile = () => api.get("/profile");

// =========================
// 👨‍🎓 Student APIs
// =========================
export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");

// =========================
// 🧑‍🏫 Admin - Class Management
// =========================
export const getClasses = async () => {
  try {
    const response = await api.get("/v1/classes");
    return response.data;
  } catch (error) {
    console.error("Error at fetching class data: ", error);
    return [];
  }
};

export const getNameOfTeachers = async () => {
  try {
    const response = await api.get("/v1/teachers");
    return response.data;
  } catch (error) {
    console.error("Error at fetching teacher data", error);
    return [];
  }
};

export const getTeachers = async () => {
  try {
    const response = await api.get("/v1/teachers");
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch teachers", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get("/v1/students");
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch students", error);
    throw error;
  }
};

export const createClass = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.className);
    formData.append("teacherName", data.teacherName);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("students", JSON.stringify(data.students));

    const response = await api.post("/v1/classes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create class", error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/v1/classes/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to delete class", error);
    throw error;
  }
};

export const updateClass = async (id, data) => {
  try {
    const response = await api.patch(`/v1/classes/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Failed to update class", error);
    throw error;
  }
};

export const createInClass = async (data) => {
  try {
    console.log("Creating inClass with data:", data);
    const response = await api.post('/inclass', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create inClass:", error);
    throw error;
  }
};


export const getGoalsByUser = async (userId) => {
  try {
    const response = await api.get(`/goal?user_id=${userId}`); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch goals", error);
    throw error;
  }
};
// =========================
// 🎯 Goal Management
// =========================
export const createGoal = async (goalData) => {
  try {
    const response = await api.post("/goal", goalData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getGoal = async (id) => {
  try {
    const response = await api.get(`/goal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get goal:", error);
    throw error;
  }
};

export const getAllGoal = async () => {
  try {
    const response = await api.get(`/goal`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const editGoal = async (id, updatedGoal) => {
  try {
    const response = await api.put(`/goal/${id}`, updatedGoal);
    return response.data;
  } catch (error) {
    console.error("Failed to edit goal:", error);
    throw error;
  }
};

export const deleteGoal = async (id) => {
  try {
    const response = await api.delete(`/goal/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateGoalStatus = async (id, status) => {
  try {
    const response = await api.put(`/goal/${id}/completeStatus`, {
      completeStatus: status,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update goal status:", error);
    throw error;
  }
};

export const getGoalsByStatus = async (status) => {
  try {
    const response = await api.get(`/goal/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch goals by status:", error);
    throw error;
  }
};
// =========================
// Add Semester 
// =========================
export const getSemester = async () => {
    try {
        const response = await api.get(`/semester`);
        console.log("Semesters fetched:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};



export const getSemesterByID = async (id) => {
  try {
    console.log("Getting semester by ID:", id);
    const response = await api.get(`/semester/${id}`);
    console.log("Semester fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching semester:", error);
    throw error;
  }
};

// Thêm một học kì mới 
export const createSemesterByID = async (SemesterData) => {
  try {
    const response = await api.post("/semester", SemesterData);
    console.log("SemesterData created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// =========================
// 🏫 In-Class Management
// =========================
export const getAllInClass = async () => {
  try {
    const response = await api.get(`/inclass`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getInClassByID = async (id) => {
  try {
    const response = await api.get(`/inclass/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get inClass by ID:", error);
    throw error;
  }
};

export const editInClass = async (id, updatedGoal) => {
  try {
    const response = await api.put(`/inclass/${id}`, updatedGoal);
    return response.data;
  } catch (error) {
    console.error("Failed to edit inClass:", error);
    throw error;
  }
};

export const deleteInClass = async (id) => {
  try {
    const response = await api.delete(`/inclass/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch inclass", error);
    throw error;
  }
};


// =========================
// 📚 Self Study
// =========================
export const getAllSelfStudy = async () => {
  try {
    const response = await api.get(`/selfstudy`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const creatSelfStudy = async (data) => {
  try {
    const response = await api.post(`/selfstudy`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create self study:", error);
    throw error;
  }
};
export const editSelfStudy = async (id, data) => {
  try {
    const response = await api.put(`/selfstudy/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to edit self study:", error);
    }
    throw error;
  }
};


export const getSelfStudyByID = async (id) => {
  try {
    const response = await api.get(`/selfstudy/${id}`);
    console.log("selfStudy",response);
    return response.data;
  } catch (error) {
    console.error("Failed to get inClass by ID:", error);
    throw error;
  }
}; 

export const deleteSelfStudy = async (id) => {
  try {
    const response = await api.delete(`/selfstudy/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get inClass by ID:", error);
    throw error;
  }
}; 

// =========================
// ❗ Global API Error Handler
// =========================
const handleApiError = (error) => {
  if (error.response) {
    console.error("API error:", error.response.data);
  } else if (error.request) {
    console.error("No response from server:", error.request);
  } else {
    console.error("Unexpected error:", error.message);
  }
};

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

export const getAllWeekGoal = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.get(`/week-goals`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getAllTasks = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.get(`/task`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// =========================
// ❗ Week
// =========================

export const getAllWeek= async (id) => {
    try {
        console.log("ID to delete Week:", id);
        const response = await api.get(`/week`);
        console.log("Week deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};


export const createWeek = async (weekData) => {
  try {
    const response = await api.post("/week", weekData);
    console.log("SemesterData created:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export default academyAPI;
