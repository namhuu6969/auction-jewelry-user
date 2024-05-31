import axiosClient from '../../../config/axios'

export const authApi = {
  signUpApi: async (data) => {
    const response = await axiosClient.post('user/signup', data)
    return response.data
  },
  signInApi: async (data) => {
    const response = await axiosClient.post('user/signin', data)
    return response.data
  }
}