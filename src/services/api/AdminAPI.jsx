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