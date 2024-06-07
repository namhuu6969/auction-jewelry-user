import { Button, Divider, Flex, Skeleton, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcum from '@components/ui/Breadcum';
import Carousel from '@components/ui/carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { setListAuction } from '@core/store/AuctionListStore/auctionList';
import CardContent from '../../../../../../components/ui/Card';
const { Title } = Typography;
const breadcumLink = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Jewelry',
    link: '/jewelry',
  },
];
export const JewelryList = () => {
  const [loading, setLoading] = useState(false);
  const auctionData = useSelector((state) => state.auctionList.auctionListData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const endpoint = 'https://664e0a97fafad45dfaded0e5.mockapi.io/api/v1/auction-list';
  const endpointCategory = 'https://664e0a97fafad45dfaded0e5.mockapi.io/api/v1/category';
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        dispatch(setListAuction(response.data));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    const fetchCtr = async () => {
      const response = await axios.get(endpointCategory);
      setCategory(response.data);
    };
    fetchData();
    fetchCtr();
  }, [dispatch]);

  return (
    <div className='container mx-auto my-5'>
      <div>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
        <div className='container'>
          <Title className='text-left font-serif' level={3}>
            Category
          </Title>
          <Flex gap={10} className='content-center'>
            {category.map((e) => (
              <Button
                key={e.id}
                className=' !border-black font-semibold !text-black hover:!bg-[#946257] hover:!text-[#fff] font-serif'
              >
                {e.category}
              </Button>
            ))}
          </Flex>
        </div>
        <Divider />

        <div className='container'>
          <Skeleton loading={loading}>
            <Flex className='justify-between'>
              <Title level={3} className='font-serif'>
                Ring
              </Title>
              <Title level={5}>
                <Link to={'/'} className='font-serif !text-[#000] !underline'>
                  View all
                </Link>
              </Title>
            </Flex>
            <Carousel
              data={auctionData.filter((item) => item.category === 2)}
              numberOfSilde={4}
              component={CardContent}
              onClick={(e) => navigate(`detail/${e.id}`)}
            />
          </Skeleton>
        </div>
        <Divider />
        <div className='container'>
          <Skeleton loading={loading}>
            <Flex className='justify-between'>
              <Title level={3} className='font-serif'>
                In progress
              </Title>
              <Title level={5}>
                <Link to={'/'} className='font-serif !text-[#000] !underline'>
                  View all
                </Link>
              </Title>
            </Flex>
            <Carousel
              data={auctionData.filter((item) => item.status === 'inProgress')}
              numberOfSilde={4}
              component={CardContent}
              onClick={(e) => navigate(`detail/${e.id}`)}
            />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
