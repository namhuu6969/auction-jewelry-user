import api from '@config/axios';

export const myAuctionApi = {
  getCollection: async () => {
    const response = await api.get('collection');
    return response.data;
  },
  getCategory: async () => {
    const response = await api.get('category');
    return response.data;
  },
  getBrand: async () => {
    const response = await api.get('brand');
    return response.data;
  },
  getMyAuction: async () => {
    const response = await api.get('auction/myauction');
    return response.data;
  },
  updateMyAuction: async (id, data) => {
    const response = await api.put(`auction/${id}`, data);
    return response.data;
  },
  cancelAuction: async (id) => {
    const response = await api.delete(`auction/cancel/${id}`)
    return response.data
  },
  updateTimeAuction: async (id, data) => {
    const response = await api.put(`auction/time/${id}`, data)
    return response.data
  }
};
