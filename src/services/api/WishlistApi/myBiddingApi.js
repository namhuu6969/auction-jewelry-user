import api from '../../../config/axios'

export const myBiddingApi = {
  getBiddingMe: async () => {
    const response = await api.get('auction/join/user')
    return response.data
  }
}