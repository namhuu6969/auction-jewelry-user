import api from '@config/axios';

export const blogServices = {
  getBlogById: async (id) => {
    try {
      const response = await api.get(`blog/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting blog with id ${id}:`, error);
      throw error;
    }
  },
  getAllBlogs: async () => {
    try {
      const response = await api.get('blog/all');
      return response.data;
    } catch (error) {
      console.error('Error getting all blogs:', error);
      throw error;
    }
  },
};
