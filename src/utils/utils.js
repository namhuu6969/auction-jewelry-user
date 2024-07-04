import api from '@config/axios';

export const getImage = async (imageUrl) => {
  const image = await api.get(`jewelryImage/jewelry/${imageUrl}`);
  return image.data.data;
};

export const imageURL = (imageUrl) => {
  return `http://apijewelryauction.techx.id.vn:8081/uploads/jewelry/${imageUrl}`;
};

export const imageURLBlog = (imageUrl) => {
  return `http://apijewelryauction.techx.id.vn:8081/uploads/blogs/${imageUrl}`;
};

export const formatDate = (date) => {
  const formatted = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
  return formatted;
};

export const handleStatus = (status) => {
  switch (status) {
    case 'InProgress':
      return 'In Progress';
    case 'Completed':
      return 'Completed';
    case 'Waiting':
      return 'Waiting';
    case 'Cancel':
      return 'Cancel';
    default:
      return 'Fail';
  }
};

export const formatPriceVND = (price) =>
  price?.toLocaleString('vi', { style: 'currency', currency: 'VND' });

export const formatDateTime = (datetimeStr) => {
  const date = new Date(datetimeStr);
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed

  return `${day}/${month}/${year} in ${hours}:${minutes}:${seconds}`;
};

export const formatPrice = (price) => {
  if (price > 0) {
    const priceInNumber = parseFloat(price?.toString().replace('$', '').replace(',', ''));
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

export const formatDateToYMDHM = (dateString) => {
  const date = new Date(dateString);

  const padZero = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Example usage
const formattedDate = formatDateToYMDHM('2024-06-19T00:00:00.000+07:00');
console.log(formattedDate); // Output: "2024-06-19 00:00"
