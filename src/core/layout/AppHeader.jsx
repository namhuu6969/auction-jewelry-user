import { Avatar, Button, Dropdown, Flex } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { clearToken } from '../store/Auth/auth';
import { clearUserData } from '../store/PersonalStore/personal';
import { useEffect, useState } from 'react';

const services = [
  { title: 'Support', link: '/support' },
  { title: 'Service', link: '/support' },
  { title: 'About', link: '/about' },
  { title: 'Policy', link: '/support' },
  { title: 'Language', link: '/support', icon: <icon /> },
];

const navLink = [
  { title: 'Auction', link: '/auction' },
  { title: 'Suggest', link: '/jewelry' },
  { title: 'Blog', link: '/blog' },
  { title: 'On Sale', link: '/sell' },
  { title: 'Valuation', link: '/valuation' },
];

const AppHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (link) => {
    navigate(link);
  };

  const auth = localStorage.getItem('fullName');
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearToken());
    dispatch(clearUserData());
    window.location.href = '/login';
  };

  const items = [
    {
      label: (
        <Link to={'/profile'} className='font-sans'>
          My Profile
        </Link>
      ),
      key: 'profile',
    },
    {
      label: (
        <Link to={'/request/jewelry'} className='font-sans'>
          Request Jewelry
        </Link>
      ),
      key: 'requestjewelry',
    },
    {
      label: (
        <Link to={'/wishlist'} className='font-sans'>
          Manage Jewelry
        </Link>
      ),
      key: 'wishlist',
    },
    {
      label: (
        <p className='font-sans' onClick={handleLogout}>
          Logout
        </p>
      ),
      key: 'logout',
    },
  ];

  return (
    <Flex className='container mx-auto' vertical gap={'0.8rem'}>
      <Flex align='center' justify='end'>
        <Flex gap={5} justify='space-between'>
          {services.map((item) => (
            <p
              style={{ lineHeight: '1.8rem' }}
              onClick={() => handleNavigation(item.link)}
              className='font-serif font-thin text-black text-lg mx-2 hover:cursor-pointer underline underline-offset-4'
              key={`${item.title} + ${item.link}`}
            >
              {item.title}
            </p>
          ))}
        </Flex>
      </Flex>
      <Flex justify='space-between' className='h-25'>
        <Flex flex={0.4} justify='start' align='center'>
          <Title
            onClick={() => navigate('/')}
            level={3}
            className='font-serif text-black text-nowrap !mb-0 hover:cursor-pointer'
          >
            JEWELRY AUCTION
          </Title>
          <Input className='ml-5' placeholder='Search...' />
        </Flex>
        <Flex flex={0.5} justify='space-around' align='center'>
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
            <p style={{ lineHeight: '2rem' }}>{currentTime.toLocaleTimeString()}</p>
            <p style={{ lineHeight: '0.4rem' }}>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </p>
          </Flex>
          {auth ? (
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <Avatar size={48} icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Button
              className='font-serif bg-[#946257]'
              type='primary'
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
