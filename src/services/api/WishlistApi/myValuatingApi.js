import api from '../../../config/axios'

export const myValuatingApi = {
  getValuatingMe: async () => {
    const response = await api.get('valuating/me')
    return response.data
  }
}