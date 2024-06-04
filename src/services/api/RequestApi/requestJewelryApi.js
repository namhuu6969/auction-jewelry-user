import api from '@config/axios'

export const requestJewelryApi = {
  getCategory: async () => {
    const response = await api.get('category')
    return response.data
  },
  getBrand: async () => {
    const response = await api.get('brand')
    return response.data
  },
  getCollection: async () => {
    const response = await api.get('collection')
    return response.data
  },
  getMaterial: async () => {
    const response = await api.get('material')
    return response.data
  },
  addRequestJewelry: async (data) => {
    const response = await api.post('jewelry', data)
    return response.data
  }
}
