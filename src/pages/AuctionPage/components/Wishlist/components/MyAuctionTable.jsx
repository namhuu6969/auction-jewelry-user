import { Image, Table } from 'antd';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';

export const MyAuctionTable = () => {
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
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Hãng',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: 'collection',
      key: 'collection',
    },
    {
      title: 'Chất liệu',
      dataIndex: 'materials',
      key: 'materials',
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
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
    {
      key: '2',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring',
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
    {
      key: '3',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring',
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
    {
      key: '4',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring',
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
    {
      key: '5',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring',
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
  ];
  return <Table dataSource={items} columns={columns} />;
};
