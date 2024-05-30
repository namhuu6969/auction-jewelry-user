import { Divider, Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '@components/ui/carousel/Carousel';
import { Carousel as CarouselAntd } from 'antd';
import CardNews from '@components/ui/CardNews';
import CardContent from '@components/ui/Card';
import { ImageBrandCard } from '@components/ui/ImageBrandCard/ImageBrandCard';
const { Title } = Typography;

const endpoint = 'https://664e0a97fafad45dfaded0e5.mockapi.io/api/v1/auction-list';
const endpointApiNews = 'https://65487df3dd8ebcd4ab22f4d0.mockapi.io/news';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const [newsData, setNewsData] = useState([]);
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

    const fetchDataAPI = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpointApiNews);
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchDataAPI();
    fetchData();
  }, []);

  return (
    <div className='container mx-auto my-5'>
      <div className='container my-5'>
        <CarouselAntd arrows autoplay>
          <ImageBrandCard />
        </CarouselAntd>
      </div>
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
          <Carousel
            data={auctionData}
            numberOfSilde={4}
            status={'inProgress'}
            component={CardContent}
          />
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
              <Link to={'/'} className='font-serif !text-black !underline'>
                View all
              </Link>
            </Title>
          </Flex>

          <div className='container mx-auto'>
            <Flex justify='space-between'>
              <Carousel data={newsData} numberOfSilde={4} component={CardNews} />
            </Flex>
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
              <img src='/images/brand.jpg' className='object-cover h-full w-full	' alt='sadas' />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
