import { api } from "../../utils/constants";
export const getProducts = async (params) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getProduct = async (params) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getProduct2 = async (params) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getTeacherNotifications = async () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) throw new Error('User not logged in');

    const user = JSON.parse(storedUser);
    if (user.role !== 'teacher') throw new Error('User is not a teacher');

    const teacherId = user.user_id;
    if (!teacherId) throw new Error('Teacher ID is missing');

    const response = await api.get('/tag-teacher', {
      params: { teacherId }
    });

    const rawData = response.data?.data || [];
    const notifications = rawData.map((item, index) => ({
      id: index,
      studentName: item.student_name,
      student_id: item.student_id,
      content: item.message,
      timestamp: item.created_at,
      goalId: item.goal_id,
      unread: true,
      is_read: false
    }));

    return notifications;

  } catch (error) {
    console.error('Error while fetching notifications:', error);
    throw error;
  }
};