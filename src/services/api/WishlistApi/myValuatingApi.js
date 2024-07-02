import axios from 'axios'
import api from '../../../config/axios'

export const myValuatingApi = {
  getValuatingMe: async () => {
    const response = await api.get('valuating/me')
    return response.data
  },
  valuateTheJewelry: async (data) => {
    const response = await api.post('valuating', data)
    return response.data
  },
  getProvinceApi: async () => {
    const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
    return response.data
  },
  getDistrictApi: async (province) => {
    const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${province}.htm`)
    return response.data
  },
  getWardApi: async (district) => {
    const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${district}.htm`)
    return response.data
  }
}