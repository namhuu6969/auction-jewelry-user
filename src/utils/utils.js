import api from '@config/axios'

export const getImage = async (imageUrl) => {
  const image = await api.get(`jewelryImage/jewelry/${imageUrl}`)
  return image.data.data
}