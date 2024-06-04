import { Image, Table } from 'antd';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import useTableSearch from '../../../../../hooks/useTableSearch';

export const MyAuctionTable = () => {
  const { getColumnSearchProps } = useTableSearch();
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
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: [
        {
          text: 'Ring',
          value: 'Ring',
        },
      ],
      onFilter: (value, record) => record.category.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Hãng',
      dataIndex: 'brand',
      key: 'brand',
      filters: [
        {
          text: 'Louis Vuitton',
          value: 'Louis Vuitton',
        },
      ],
      onFilter: (value, record) => record.brand.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: 'collection',
      key: 'collection',
      filters: [
        {
          text: 'ABC',
          value: 'ABC',
        },
      ],
      onFilter: (value, record) => record.collection.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Chất liệu',
      dataIndex: 'materials',
      key: 'materials',
      filters: [
        {
          text: 'gold',
          value: 'gold',
        },
        {
          text: 'silver',
          value: 'silver',
        },
      ],
      onFilter: (value, record) => record.materials.startsWith(value),
      filterSearch: true,
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
      name: 'Necklace',
      category: 'Ring',
      brand: 'Louis Vuitton',
      collection: 'ABC',
      materials: 'gold',
    },
    {
      key: '2',
      image:
        'https://bazaarvietnam.vn/wp-content/uploads/2021/03/trang-suc-fine-jewelry-la-gi-cartier.jpg',
      name: 'Ring 12345',
      category: 'Necklace',
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
