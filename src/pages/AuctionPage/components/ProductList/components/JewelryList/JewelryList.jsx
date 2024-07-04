import { Divider, Flex, Skeleton, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Breadcum from '@components/ui/Breadcum';
import Carousel from '@components/ui/carousel/Carousel';
import { useDispatch } from 'react-redux';
import CardContent from '../../../../../../components/ui/Card';
import { jewelryApi } from '../../../../../../services/api/JewelryApi/jewelryApi';
import useSWR from 'swr';

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

const fetchCategory1Data = async () => {
  const response = await jewelryApi.getAuctionSuggest('category=1');
  return response.data.content;
};

const fetchCollection1Data = async () => {
  const response = await jewelryApi.getAuctionSuggest('collection=1');
  return response.data.content;
};

export const JewelryList = () => {
  const navigate = useNavigate();
  const {
    data: dataCategory1,
    error: errorCategory1,
    isLoading: isLoadingCategory1,
  } = useSWR('category=1', fetchCategory1Data);
  const {
    data: dataCollection1,
    error: errorCollection1,
    isLoading: isLoadingCollection1,
  } = useSWR('collection=1', fetchCollection1Data);

  if (isLoadingCategory1 || isLoadingCollection1) {
    return <Skeleton active />;
  }

  if (errorCategory1 || errorCollection1) {
    return <div>Error loading data</div>;
  }

  return (
    <div className='container mx-auto my-5'>
      <div>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
        <div className='container'>
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
        </div>
        <Divider />
        <div className='container'>
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
        </div>
      </div>
    </div>
  );
};
