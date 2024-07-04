import api from '@config/axios';

export const UserServices = {
  getProfile: async () => {
    try {
      const response = await api.get(`user/me`);
      return response.data;
    } catch (err) {
      return err;
    }
  },
  upDateProfile: async () => {
    try {
      const response = await api.put(`user`);
      return response.data;
    } catch (err) {
      return err;
    }
  },
  uploadAvatar: async (data) => {
    try {
      const response = await api.post(`user/uploadavatar`, data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
  createPayment: async (amount) => {
    try {
      const response = await api.get(`payment/create_payment?amount=${parseFloat(amount)}`);
      return response.data;
    } catch (err) {
      return err;
    }
  },
};
