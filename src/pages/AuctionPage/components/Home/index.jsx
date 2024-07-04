import { Divider, Flex, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from '@components/ui/carousel/Carousel';
import { Carousel as CarouselAntd } from 'antd';
import CardNews from '@components/ui/CardNews';
import CardContent from '@components/ui/Card';
import { ImageBrandCard } from '@components/ui/ImageBrandCard/ImageBrandCard';
import { auctionApi } from '@api/AuctionServices/AuctionApi/AuctionApi';
import { blogServices } from '../../../../services/api/BlogServices/BlogServices';

const { Title } = Typography;

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchDataAuction = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAllAuctions();
        setAuctionData(response.data.filter((item) => ['InProgress'].includes(item.status)));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogServices.getAllBlogs();
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchDataAuction();
    fetchBlog();
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='container'>
        <CarouselAntd arrows autoplay>
          <ImageBrandCard />
        </CarouselAntd>
      </div>
      <div className='container my-5'>
        <Skeleton loading={loading}>
          <Flex className='justify-between'>
            <Title level={3} className='font-serif'>
              UpComing Auction
              <div className='ml-1 mt-2 mb-4 border-solid border-b-2 border-[#000] w-[120px]' />
            </Title>
            <Title level={5}>
              <Link to={'/jewelry'} className='font-serif !text-[#000] !underline'>
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

      <div className='container'>
        <Skeleton loading={loading}>
          <Flex className='justify-between'>
            <Title level={3} className='font-serif'>
              Blogs
              <div className='mt-2 mb-4 border-b-2 border-black w-30' />
            </Title>
            <Title level={5}>
              <Link to={'/blog'} className='font-serif !text-black !underline'>
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
              <div className='p-[100px] h-full bg-[#F2E7E7] flex justify-self-start'>
                <Flex justify='start' align='start' vertical>
                  <p className='text-black text-3xl ml-6 mb-4'>Sell With Brand</p>
                  <p className='text-black text-sm'>
                    Curious to know if your item is suitable for one of our upcoming sales? Provide
                    information and share images to request an online estimate now.
                  </p>
                </Flex>
              </div>
            </div>
            <div className='w-1/2 h-[400px]'>
              <img src='/images/brand.jpg' className='object-cover h-full w-full' alt='Brand' />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
