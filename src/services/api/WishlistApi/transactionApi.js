import api from '../../../config/axios'

 export const transactionApi = {
  getTransactionUser: async () => {
    const response = await api.get('transaction/user')
    return response.data
  }
}