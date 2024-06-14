import api from '@config/axios';

export const auctionApi = {
  getAuctionById: async (id) => {
    try {
      const response = await api.get(`auction/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting auction with id ${id}:`, error);
      throw error;
    }
  },
  updateAuctionById: async (id, data) => {
    try {
      const response = await api.put(`auction/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating auction with id ${id}:`, error);
      throw error;
    }
  },
  deleteAuctionById: async (id) => {
    try {
      const response = await api.delete(`auction/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting auction with id ${id}:`, error);
      throw error;
    }
  },
  getAllAuctions: async () => {
    try {
      const response = await api.get('auction');
      return response.data;
    } catch (error) {
      console.error('Error getting all auctions:', error);
      throw error;
    }
  },
  createAuction: async (data) => {
    try {
      const response = await api.post('auction', data);
      return response.data;
    } catch (error) {
      console.error('Error creating auction:', error);
      throw error;
    }
  },
  viewAuction: async () => {
    try {
      const response = await api.get('auction/viewauction');
      return response.data;
    } catch (error) {
      console.error('Error viewing auction:', error);
      throw error;
    }
  },
  searchAuctions: async (query) => {
    try {
      const response = await api.get('auction/search', { params: query });
      return response.data;
    } catch (error) {
      console.error('Error searching auctions:', error);
      throw error;
    }
  },
  getMyAuctions: async () => {
    try {
      const response = await api.get('auction/myauction');
      return response.data;
    } catch (error) {
      console.error('Error getting my auctions:', error);
      throw error;
    }
  },
  getAuctionsByCollection: async (collectionId) => {
    try {
      const response = await api.get(`auction/collection/${collectionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting auctions by collection with id ${collectionId}:`, error);
      throw error;
    }
  },
  getAuctionsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`auction/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting auctions by category with id ${categoryId}:`, error);
      throw error;
    }
  },
};
