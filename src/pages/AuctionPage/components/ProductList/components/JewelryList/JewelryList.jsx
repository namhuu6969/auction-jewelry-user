import { Divider, Flex, Skeleton, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcum from '@components/ui/Breadcum';
import Carousel from '@components/ui/carousel/Carousel';
import { useDispatch } from 'react-redux';
import CardContent from '../../../../../../components/ui/Card';
import { jewelryApi } from '../../../../../../services/api/JewelryApi/jewelryApi';
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
  const [dataCategory1, setDataCategory1] = useState([]);
  const [dataCollection1, setDataCollection1] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseCategory1 = await jewelryApi.getAuctionSuggest(
          'category=1'
        );
        const responseCollection1 = await jewelryApi.getAuctionSuggest(
          'collection=1'
        );
        setDataCategory1(responseCategory1.data.content);
        setDataCollection1(responseCollection1.data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className='container mx-auto my-5'>
      <div>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
        <div className='container'>
          <Skeleton loading={loading}>
            <Flex className='justify-between'>
              <Title level={3} className='font-serif'>
                {dataCategory1[0]?.jewelry?.category?.name}
              </Title>
              <Title level={5}>
                <Link to={'/'} className='font-serif !text-[#000] !underline'>
                  View all
                </Link>
              </Title>
            </Flex>
            <Carousel
              data={dataCategory1}
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
                {dataCollection1[0]?.jewelry?.collection?.name}
              </Title>
              <Title level={5}>
                <Link to={'/'} className='font-serif !text-[#000] !underline'>
                  View all
                </Link>
              </Title>
            </Flex>
            <Carousel
              data={dataCollection1}
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
