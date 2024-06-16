import api from '../../../config/axios'

export const myValuatingApi = {
  getValuatingMe: async () => {
    const response = await api.get('valuating/me')
    return response.data
  },
  valuateTheJewelry: async (data) => {
    const response = await api.post('valuating', data)
    return response.data
  }
}