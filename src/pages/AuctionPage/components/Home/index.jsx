import { Divider, Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '@components/ui/carousel/Carousel';
const { Title } = Typography;
export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const endpoint = 'https://664e0a97fafad45dfaded0e5.mockapi.io/api/v1/auction-list';
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        setAuctionData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='container mx-auto my-5'>
      <div className='container'>
        <Skeleton loading={loading}>
          <Flex className='justify-between'>
            <Title level={3} className='font-serif'>
              UpComing Auction
              <div className='ml-1 mt-2 mb-4 border-solid border-b-2 border-[#000] w-[120px]' />
            </Title>
            <Title level={5}>
              <Link to={'/'} className='font-serif !text-[#000] !underline'>
                View all
              </Link>
            </Title>
          </Flex>
          <Carousel data={auctionData} numberOfSilde={4} status={'inProgress'} />
        </Skeleton>
      </div>
      <Divider />
      <div className='container mt-5'>
        <Skeleton loading={loading}>
          <Flex className='justify-between'>
            <Title level={3} className='font-serif'>
              News
              <div className='mt-2 mb-4 border-b-2 border-black w-30' />
            </Title>
            <Title level={5}>
              <Link to={'/'} className='font-serif text-black underline'>
                View all
              </Link>
            </Title>
          </Flex>

          <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-3 '>
              <div className='p-40 bg-black'></div>
            </div>
            <div className='col-span-6'>
              <div className='p-40 bg-black'></div>
            </div>
            <div className='col-span-3 grid gap-10'>
              <div className='p-16 row-span-1 bg-black'></div>
              <div className='p-16 row-span-1 bg-black'></div>
            </div>
          </div>
        </Skeleton>
      </div>
      <div className='container mt-5'>
        <Skeleton loading={loading}>
          <Flex className='justify-between'>
            <Title level={3} className='font-serif'>
              UpComing Auction
              <div className='ml-1 mt-2 mb-4 border-solid border-b-2 border-[#000] w-[120px]' />
            </Title>
          </Flex>
          <div className='w-full flex'>
            <div className='w-1/2'>
              <div className='p-[100px] h-full bg-black flex justify-self-start'>
                <Flex justify='start' align='start' vertical>
                  <p className='text-white text-3xl ml-6 mb-4'>Sell With Brand</p>
                  <p className='text-white text-sm'>
                    Curious to know if your item is suitable for one of our upcoming sales? Provide
                    information and share images to request an online estimate now.
                  </p>
                </Flex>
              </div>
            </div>
            <div className='w-1/2 h-[400px]'>
              <img
                src='public/images/brand.jpg'
                className='object-cover h-full w-full	'
                alt='sadas'
              />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
