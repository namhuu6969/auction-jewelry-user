import { Card, Typography } from 'antd';
import { formatPriceVND } from '@utils/utils';

const { Title } = Typography;

const MiniCard = ({ imageSrc, title, price }) => {
  const truncateTitle = (title, number = 10) => {
    const words = title.split(' ');
    if (words.length > number) {
      return `${words.slice(0, number).join(' ')} ...`;
    }
    return title;
  };

  return (
    <Card className='hover:cursor-pointer' style={{ width: 300, margin: '0.4rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1' }}>
          <img
            src={`http://localhost:8080/uploads/jewelry/${imageSrc}`}
            alt={truncateTitle(title, 3)}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ flex: '3', marginLeft: '0.8rem', textAlign: 'start' }}>
          <Title className='font-bold !text-sm' level={5}>
            {truncateTitle(title)}
          </Title>
          <p className='text-[0.75rem]' style={{ fontWeight: '500' }}>
            Starting Price: {formatPriceVND(price)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MiniCard;
