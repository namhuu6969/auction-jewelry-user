import axiosClient from '../../../config/axios'

export const authApi = {
  signUpApi: async (data) => {
    const response = await axiosClient.post('user/signup', data)
    return response.response.data
  }
}