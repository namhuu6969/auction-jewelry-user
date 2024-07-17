import { Avatar, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export const SellerCard = ({ sellerId }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/profile/${sellerId.id}`)}
      className='font-sans !font-medium flex mt-5 flex-col border border-gray-300 py-5 px-10 rounded-lg'
    >
      <Title level={3} className='text-left font-serif'>
        Seller
      </Title>
      <Flex gap={30}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Flex vertical className='justify-center'>
          <Title level={4}>{sellerId.full_name}</Title>
        </Flex>
      </Flex>
    </Card>
  );
};
