import api from '../../../config/axios'

export const jewelryApi = {
  getAuctionSuggest: async (filter) => {
    console.log(filter)
    const response = await api.get(`auction/viewauction?${filter}`)
    return response.data
  }
}