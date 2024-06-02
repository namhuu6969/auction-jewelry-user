import { Tabs } from 'antd';
import './index.css';
import { MyAuctionTable } from './components/MyAuctionTable';
import { WishlistTable } from './components/WishlistTable';
import { WinningTable } from './components/WinningTable';
import { OnSaleTable } from './components/OnSaleTable';
import { EndingTable } from './components/EndingTable';
import { BiddingTable } from './components/BiddingTable';
import NotAuthorize from '../../../../components/ui/NotAuthorize';
import { useSelector } from 'react-redux';
const WishlistPage = () => {
  const authorize = useSelector((state) => state.auth.fullName);
  const items = [
    {
      key: 1,
      label: 'Phiên của tôi',
      children: <MyAuctionTable />,
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
