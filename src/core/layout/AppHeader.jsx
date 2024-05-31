import { Button, Flex } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const services = [
  { title: 'Support', link: '/support' },
  { title: 'Services', link: '/support' },
  { title: 'About', link: '/about' },
  { title: 'License', link: '/support' },
  { title: 'Language', link: '/support', icon: <icon /> },
];

const navLink = [
  { title: 'Auctions', link: '/auction' },
  { title: 'Blog', link: '/blog' },
  { title: 'Sell', link: '/sell' },
];

const AppHeader = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };
  return (
    <Flex className='container mx-auto' vertical gap={'0.8rem'}>
      <Flex align='center' justify='end'>
        <Flex flex={0.25} justify='space-between'>
          {services.map((item) => (
            <p
              style={{ lineHeight: '1.8rem' }}
              onClick={() => handleNavigation(item.link)}
              className='font-serif font-thin text-black text-lg mx-2 hover:cursor-pointer'
              key={`${item.title} + ${item.link}`}
            >
              {item.title}
            </p>
          ))}
        </Flex>
      </Flex>
      <Flex justify='space-between' className='h-25'>
        <Flex flex={0.4} justify='start' align='center'>
          <Title level={3} className='font-serif text-black text-nowrap !mb-0 hover:cursor-pointer'>
            JEWELRY AUCTION
          </Title>
          <Input className='ml-5' placeholder='Search...' />
        </Flex>
        <Flex flex={0.3} justify='space-around' align='center'>
          {navLink.map((item) => (
            <p
              onClick={() => handleNavigation(item.link)}
              style={{ lineHeight: '0rem' }}
              className='font-serif font-thin text-black text-lg mx-2 line-height-none hover:cursor-pointer'
              key={`${item.title} + ${item.link}`}
            >
              {item.title}
            </p>
          ))}
          <Flex vertical className='pt-4 pb-8 font-serif text-lg text-black'>
            <p style={{ lineHeight: '2rem' }}>13:31:10 PM</p>
            <p style={{ lineHeight: '0.4rem' }}>Thurday, 16/5/2024</p>
          </Flex>
          <Button
            className='font-serif bg-[#946257]'
            type='primary'
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
