import api from './AxiosConfig';

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