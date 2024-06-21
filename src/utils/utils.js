import api from '@config/axios';

export const getImage = async (imageUrl) => {
  const image = await api.get(`jewelryImage/jewelry/${imageUrl}`);
  return image.data.data;
};

export const imageURL = (imageUrl) => {
  return `http://167.71.212.203:8080/uploads/jewelry/${imageUrl}`;
};

export const formatDateTime = (datetimeStr) => {
  const date = new Date(datetimeStr);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed

  return `ngày ${day}/${month} vào ${hours}:${minutes}:${seconds}`;
};

export const formatPrice = (price) => {
  if (price > 0) {
    const priceInNumber = parseFloat(price.toString().replace('$', '').replace(',', ''));
    if (priceInNumber >= 1000000000) {
      const billion = Math.floor(priceInNumber / 1000000000);
      const million = Math.floor((priceInNumber % 1000000000) / 1000000);
      return `${billion} tỷ ${million} triệu`;
    } else if (priceInNumber >= 1000000) {
      const million = Math.floor(priceInNumber / 1000000);
      return `${million} triệu`;
    } else {
      return `${priceInNumber.toLocaleString('vi-VN')}`;
    }
  } else {
    return 0;
  }
};
