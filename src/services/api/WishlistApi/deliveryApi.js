import api from '../../../config/axios'

export const deliveryApi = {
  getMyDelivery: async () => {
    const response = await api.get('delivery-method/me')
    return response.data
  }
}