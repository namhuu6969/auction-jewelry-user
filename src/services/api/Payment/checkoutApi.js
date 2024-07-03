import api from '../../../config/axios'

export const checkoutApi = {
  checkoutPaymentAuction: async (data) => {
    const response = await api.post('checkout', data)
    return response.data
  },
  checkoutConfirm: async (id) => {
    const response = await api.put(`checkout/confirm/${id}`)
    return response.data
  }
}