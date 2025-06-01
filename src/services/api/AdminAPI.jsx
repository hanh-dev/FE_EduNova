import { api } from "../../utils/constants";
export const getClassStats = async () => {
  try {
    const response = await api.get('/v1/classes/stats');
    return response.data;
  } catch (error) {
    console.error("Failed to create inClass:", error);
    throw error;
  }
};

export const getAllAnnouncement = async () => {
  try {
    const response = await api.get('/v1/announcement');
    return response.data;
  } catch (error) {
    console.error("Failed to create inClass:", error);
    throw error;
  }
}

export const createAnnouncement = async(data) => {
  try {
    console.log("Check data: ", data);
    const response = await api.post('/v1/announcement', data);
    return response.data;
  } catch (error) {
    console.error("Failed to create announcement:", error);
    throw error;
  }
}

export const deleteAnnouncement = async(id) => {
  try {
    const response = await api.delete(`/v1/announcement/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete announcement:", error);
    throw error;
  }
}