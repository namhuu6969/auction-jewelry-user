import { Card, Typography } from 'antd';

const { Title } = Typography;

const MiniCard = ({ imageSrc, title, price }) => {
  const truncateTitle = (title, number = 10) => {
    const words = title.split(' ');
    if (words.length > number) {
      return `${words.slice(0, number).join(' ')} ...`;
    }
    return title;
  };

  const formatPrice = (price) => {
    const priceInNumber = parseFloat(price.replace('$', '').replace(',', ''));
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
  };

  return (
    <Card className='hover:cursor-pointer' style={{ width: 300, margin: '0.4rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1' }}>
          <img
            src={imageSrc}
            alt={truncateTitle(title, 3)}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ flex: '3', marginLeft: '0.8rem', textAlign: 'start' }}>
          <Title className='font-bold !text-sm' level={5}>
            {truncateTitle(title)}
          </Title>
          <p className='text-[0.75rem]' style={{ fontWeight: '500' }}>
            Giá khởi điểm: {formatPrice(price)} VNĐ
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MiniCard;
