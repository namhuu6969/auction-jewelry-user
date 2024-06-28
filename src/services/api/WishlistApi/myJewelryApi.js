import api from '../../../config/axios'

export const myJewelryApi = {
  updateJewelry: async (id, data) => {
    const response = await api.put(`jewelry/${id}`, data)
    return response.data
  },
  getJewelryById: async (id) => {
    const response = await api.get(`jewelry/${id}`)
    return response.data
  },
  deleteJewelryApi: async (id) => {
    const response  = await api.delete(`jewelry/${id}`)
    return response.data
  },
  updateMaterialJewelry: async (id, data) => {
    const response = await api.put(`jewelry/materials/${id}`, data)
    return response.data
  }
}