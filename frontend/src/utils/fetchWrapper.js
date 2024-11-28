import { useAuth } from './authContext';

const fetchWrapper = {
  get: async (url, headers = {}, authToken) => {
    try {
      const { axiosInstance } = useAuth();
      const response = await axiosInstance.get(url, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  post: async (url, body, headers = {}, authToken) => {
    try {
      const { axiosInstance } = useAuth();
      const response = await axiosInstance.post(url, body, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  put: async (url, body, headers = {}, authToken) => {
    try {
      const { axiosInstance } = useAuth();
      const response = await axiosInstance.put(url, body, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (url, headers = {}, authToken) => {
    try {
      const { axiosInstance } = useAuth();
      const response = await axiosInstance.delete(url, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  patch: async (url, body, headers = {}, authToken) => {
    try {
      const { axiosInstance } = useAuth();
      const response = await axiosInstance.patch(url, body, {
        headers: { ...headers },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

const handleError = (error) => {
  console.error('API Error:', error.message);
  throw error;
};

export default fetchWrapper;
