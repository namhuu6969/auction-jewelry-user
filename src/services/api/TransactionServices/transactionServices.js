import api from '@config/axios';

export const transactionServices = {
  getUserTransactions: async () => {
    try {
      const response = await api.get(`transaction/user`);
      return response.data;
    } catch (error) {
      console.error(`Error getting transactions for user`, error);
      throw error;
    }
  },
};
