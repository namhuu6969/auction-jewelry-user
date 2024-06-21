import api from '@config/axios';

export const wishlistApi = {
  getJewelryByMe: async () => {
    const response = await api.get('jewelry/me');
    return response.data;
  },
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
  addAuction: async (data) => {
    const response = await api.post('auction', data);
    return response.data;
  },
  getMaterial: async () => {
    const response = await api.get('material');
    return response.data;
  },
  addWishList: async (data) => {
    const response = await api.post('wishlist', data);
    return response.data;
  },
};
