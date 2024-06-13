import api from '../../../config/axios'

export const myJewelryApi = {
  updateJewelry: async (id, data) => {
    const response = await api.put(`jewelry/${id}`, data)
    return response.data
  },
  getJewelryById: async (id) => {
    const response = await api.get(`jewelry/${id}`)
    return response.data
  }
}