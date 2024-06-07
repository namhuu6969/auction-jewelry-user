import api from '@config/axios'

export const getImage = async (imageUrl) => {
  const image = await api.get(`jewelryImage/${imageUrl}`)
  console.log(image)
  return image
}