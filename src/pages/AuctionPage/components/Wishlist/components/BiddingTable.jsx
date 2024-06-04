import { Image, Table } from 'antd';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';

export const BiddingTable = () => {
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image className='!w-[150px] !h-[150px]' src={image} alt='' />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá hiện tại',
      dataIndex: 'current',
      key: 'current',
    },
    {
      title: 'Giá mua ngay',
      dataIndex: 'buynow',
      key: 'buynow  ',
    },
    {
      title: 'Số người tham gia',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: 'Người bán',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: 'Đấu giá cao nhất',
      dataIndex: 'best',
      key: 'best',
    },
    {
      title: 'Còn lại',
      dataIndex: 'remain',
      key: 'remain',
    },
    {
      title: 'Hành dộng',
      key: 'action',
      render: () => (
        <PrimaryButton onClick={() => console.log('Success')}>
          Xem
        </PrimaryButton>
      ),
    },
  ];
  const items = [
    {
      key: '1',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring',
      current: '1.000.000 VND',
      buynow: '5.000.000 VND',
      participants: '12',
      seller: 'ABC',
      best: 'XYZ',
      remain: '3 days',
    },
  ];
  return <Table dataSource={items} columns={columns} />;
};
