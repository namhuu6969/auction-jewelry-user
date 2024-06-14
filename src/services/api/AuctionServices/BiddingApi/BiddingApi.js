import api from '@config/axios';

export const BiddingApi = {
  createBid: async (data) => {
    try {
      const response = await api.post('bidding', data);
      return response.data;
    } catch (error) {
      console.error('Error creating bid:', error);
      throw error;
    }
  },

  getBidsByAuctionId: async (auctionId) => {
    try {
      const response = await api.get(`bidding/auction/${auctionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting bids for auction with id ${auctionId}:`, error);
      throw error;
    }
  },
};
