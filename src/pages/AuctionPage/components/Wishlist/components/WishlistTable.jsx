import { Image, Table } from 'antd';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { formatDate, imageURL } from '../../../../../utils/utils';
import useTableSearch from '../../../../../hooks/useTableSearch';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';

export const WishlistTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: ['auction', 'jewelry', 'thumbnail'],
      key: 'image',
      render: (data) => (
        <>
          <Image
            className='!w-[150px] !h-[150px]'
            src={imageURL(data)}
            alt=''
          />
        </>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: ['auction', 'createdAt'],
      key: 'createdAt',
      ...getColumnSearchDateProps('createdAt'),
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
      render: (data) => formatDate(data),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: ['auction', 'jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Danh mục',
      dataIndex: ['auction', 'jewelry', 'category', 'name'],
      key: 'category',
    },
    {
      title: 'Hãng',
      dataIndex: ['auction', 'jewelry', 'brand', 'name'],
      key: 'brand',
      ...getColumnSearchProps('brand'),
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: ['auction', 'jewelry', 'collection', 'name'],
      key: 'collection',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: ['auction', 'startTime'],
      key: 'startTime',
      render: (data) => formatDate(data),
    },
    {
      title: 'Trạng thái',
      dataIndex: ['auction', 'status'],
      key: 'status',
    },
    {
      title: 'Hành dộng',
      key: 'action',
      fixed: 'right',
      render: () => (
        <PrimaryButton onClick={() => console.log('Success')}>
          Xem
        </PrimaryButton>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await wishlistApi.getWishlist();
        setDataSource(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Table
        scroll={{
          x: 2000,
        }}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};
