import api from '../../../config/axios'

export const checkoutApi = {
  checkoutPaymentAuction: async (data) => {
    const response = api.post('checkout', data)
    return response.data
  }
}