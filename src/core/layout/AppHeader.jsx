import { Button, Flex } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { Input } from 'antd';

const services = [
  { title: 'Support', link: '/support' },
  { title: 'Services', link: '/support' },
  { title: 'About', link: '/support' },
  { title: 'License', link: '/support' },
  { title: 'Language', link: '/support', icon: <icon /> },
];

const navLink = [
  { title: 'Auctions', link: '/auction' },
  { title: 'Blog', link: '/blog' },
  { title: 'Sell', link: '/sell' },
];

const AppHeader = () => {
  return (
    <Flex className='mx-28 h-full' vertical gap={'0.8rem'}>
      <Flex align='center' justify='end'>
        <Flex className='' justify='space-between'>
          {services.map((item) => (
            <p
              style={{ lineHeight: '1.8rem' }}
              className='font-serif font-thin text-black text-lg mx-2'
              key={`${item.title} + ${item.link}`}
            >
              {item.title}
            </p>
          ))}
        </Flex>
      </Flex>
      <Flex justify='space-between' className='h-20 '>
        <Flex flex={0.4} justify='start' align='center'>
          <Title style={{ marginBottom: '0' }} className='w-3/5 font-serif' level={4}>
            JEWELRY AUCTION
          </Title>
          <Input placeholder='Search...' />
        </Flex>
        <Flex flex={0.3} justify='space-around' align='center'>
          {navLink.map((item) => (
            <p
              style={{ lineHeight: '0rem' }}
              className='font-serif font-thin text-black text-lg mx-2 line-height-none'
              key={`${item.title} + ${item.link}`}
            >
              {item.title}
            </p>
          ))}
          <Flex vertical className='pt-4 pb-8 font-serif text-lg text-black'>
            <p style={{ lineHeight: '2rem' }}>13:31:10 PM</p>
            <p style={{ lineHeight: '0.4rem' }}>Thurday, 16/5/2024</p>
          </Flex>
          <Button className='font-serif' type='primary'>
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
