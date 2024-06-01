import api from '@config/axios'

export const requestJewelryApi = {
  getCategory: async () => {
    const response = await api.get('category')
    return response.data
  },
  getBrand: async () => {
    const response = await api.get('brand')
    return response.data
  }
}
