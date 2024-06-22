import api from '@config/axios';

export const getImage = async (imageUrl) => {
  const image = await api.get(`jewelryImage/jewelry/${imageUrl}`);
  return image.data.data;
};

export const imageURL = (imageUrl) => {
  return `http://apijewelryauction.techx.id.vn:8081/uploads/jewelry/${imageUrl}`;
};

export const formatDate = (date) => {
  const formatted = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
  return formatted;
};

export const formatPriceVND = (price) =>
  price?.toLocaleString('vi', { style: 'currency', currency: 'VND' });

export const formatPrice = (price) => {
  if (price > 0) {
    const priceInNumber = parseFloat(
      price?.toString().replace('$', '').replace(',', '')
    );
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
