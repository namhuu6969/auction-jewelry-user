import { Tabs } from 'antd';
import './index.css';
import { MyJewelryTable } from './components/MyJewelryTable';
import { WishlistTable } from './components/WishlistTable';
import { WinningTable } from './components/WinningTable';
import { OnSaleTable } from './components/OnSaleTable';
import { EndingTable } from './components/EndingTable';
import { BiddingTable } from './components/BiddingTable';
import NotAuthorize from '../../../../components/ui/NotAuthorize';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { wishlistApi } from '../../../../services/api/WishlistApi/wishlistApi';
import { setBrand, setCategory, setCollection } from '../../../../core/store/WishlistStore/wishlist';
const WishlistPage = () => {
  const authorize = useSelector((state) => state.auth.fullName);
  const dispatch = useDispatch()
  const items = [
    {
      key: 1,
      label: 'Trang sức của tôi',
      children: <MyJewelryTable />,
    },
    {
      key: 2,
      label: 'Mong muốn',
      children: <WishlistTable />,
    },
    {
      key: 3,
      label: 'Đấu giá',
      children: <BiddingTable />,
    },
    {
      key: 4,
      label: 'Đấu giá thắng',
      children: <WinningTable />,
    },
    {
      key: 5,
      label: 'Đang bày bán',
      children: <OnSaleTable />,
    },
    {
      key: 6,
      label: 'Đã kết thúc',
      children: <EndingTable />,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const responseCate = await wishlistApi.getCategory()
      const responseBrand = await wishlistApi.getBrand()
      const responseCollection = await wishlistApi.getCollection()
      dispatch(setCategory(responseCate.data))
      dispatch(setBrand(responseBrand.data))
      dispatch(setCollection(responseCollection.data))
    }
    fetchData()
  }, [dispatch])
  return (
    <div className='h-full'>
      {authorize ? (
        <Tabs defaultActiveKey='1' className='custom-tabs' items={items} />
      ) : (
        <NotAuthorize />
      )}
    </div>
  );
};

export default WishlistPage;
