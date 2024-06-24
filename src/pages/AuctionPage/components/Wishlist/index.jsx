import { Divider, Flex, Tabs } from 'antd';
import './index.css';
import { MyJewelryTable } from './components/MyJewelryTable';
import { WishlistTable } from './components/WishlistTable';
import { WinningTable } from './components/WinningTable';
import { BiddingTable } from './components/BiddingTable';
import NotAuthorize from '../../../../components/ui/NotAuthorize';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { wishlistApi } from '../../../../services/api/WishlistApi/wishlistApi';
import Breadcum from '@components/ui/Breadcum';
import {
  setBrand,
  setCategory,
  setCollection,
  setMaterial,
} from '../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { MyAuctionTable } from './components/MyAuctionTable';
import { ValuatingTable } from './components/ValuatingTable';
const WishlistPage = () => {
  const authorize = localStorage.getItem('fullName');
  const breadcumLink = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Dashboard',
      link: '/wishlist',
    },
  ];
  const dispatch = useDispatch();
  const items = [
    {
      key: 1,
      label: 'My Jewelry',
      children: <MyJewelryTable />,
    },
    {
      key: 2,
      label: 'My Valuating',
      children: <ValuatingTable />,
    },
    {
      key: 3,
      label: 'My Auction',
      children: <MyAuctionTable />,
    },
    {
      key: 4,
      label: 'My Wishlist',
      children: <WishlistTable />,
    },
    {
      key: 5,
      label: 'My Bidding',
      children: <BiddingTable />,
    },
    {
      key: 6,
      label: 'My Winning',
      children: <WinningTable />,
    },

  ];
  useEffect(() => {
    const fetchData = async () => {
      const responseCate = await wishlistApi.getCategory();
      const responseBrand = await wishlistApi.getBrand();
      const responseCollection = await wishlistApi.getCollection();
      const responseMaterial = await wishlistApi.getMaterial()
      dispatch(setCategory(responseCate.data));
      dispatch(setBrand(responseBrand.data));
      dispatch(setCollection(responseCollection.data));
      dispatch(setMaterial(responseMaterial.data))
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className='h-full'>
      {authorize ? (
        <>
          <Flex className='flex-col'>
            <Breadcum linkBreadcum={breadcumLink} />
            <Divider className='border-black' />
          </Flex>
          <Tabs defaultActiveKey='1' className='custom-tabs' items={items} />
        </>
      ) : (
        <NotAuthorize />
      )}
    </div>
  );
};

export default WishlistPage;
