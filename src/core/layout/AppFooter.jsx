import { Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const AppFooter = () => {
  return <Flex className='container  mx-auto items-center justify-between'>
    <Title level={2} className='font-serif'><Link className='!text-[#000]' to={'/jewelry'}>Auction Jewelry</Link></Title>
    <Flex gap={100}>
      <Flex vertical className='text-left'>
        <Title level={4}>About Us</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
      </Flex>
      <Flex vertical className='text-left'>
        <Title level={4}>About Us</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
      </Flex>
      <Flex vertical className='text-left'>
        <Title level={4}>About Us</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
        <Title level={5}>Page</Title>
      </Flex>
    </Flex>
  </Flex>;
};

export default AppFooter;
