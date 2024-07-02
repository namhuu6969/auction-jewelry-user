import { Dropdown, Image, Menu, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { formatDate, imageURL } from '../../../../../utils/utils';
import useTableSearch from '../../../../../hooks/useTableSearch';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { useNotification } from '../../../../../hooks/useNotification';

export const WishlistTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = useNotification();
  const handleDeleteWishlist = async (id) => {
    try {
      setLoading(true);
      await wishlistApi.deleteWishlist(id);
      openNotification({
        type: 'success',
        title: 'Delete success',
      });
    } catch (error) {
      openNotification({
        title: 'Failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const getMenu = (id) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => handleDeleteWishlist(id)}>Put up auction</a>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: '',
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
      title: 'Createđ At',
      dataIndex: ['auction', 'createdAt'],
      key: 'createdAt',
      ...getColumnSearchDateProps('auction', 'createdAt'),
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
      render: (data) => formatDate(data),
    },
    {
      title: 'Name',
      dataIndex: ['auction', 'jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps(['auction', 'jewelry', 'name']),
    },
    {
      title: 'Category',
      dataIndex: ['auction', 'jewelry', 'category', 'name'],
      key: 'category',
    },
    {
      title: 'Brand',
      dataIndex: ['auction', 'jewelry', 'brand', 'name'],
      key: 'brand',
      ...getColumnSearchProps('brand'),
    },
    {
      title: 'Collection',
      dataIndex: ['auction', 'jewelry', 'collection', 'name'],
      key: 'collection',
    },
    {
      title: 'Start Time',
      dataIndex: ['auction', 'startTime'],
      key: 'startTime',
      render: (data) => formatDate(data),
    },
    {
      title: 'Status',
      dataIndex: ['auction', 'status'],
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (data) => (
        <Dropdown overlay={getMenu(data.id)} trigger={['click']}>
          <a>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await wishlistApi.getWishlist();
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDataSource(sortedData);
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
      {contextHolder}
      <Table
        scroll={{
          x: 2000,
        }}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 4 }}
      />
    </>
  );
};
