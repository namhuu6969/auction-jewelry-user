import { Dropdown, Image, Menu, Space, Table, Tag } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAddAuction } from './ModalAddAuction';
import { setJewelryId } from '../../../../../core/store/WishlistStore/wishlist';

export const MyJewelryTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const [jewelryData, setJewelryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const category = useSelector((state) => state.wishlist.category);
  const brand = useSelector((state) => state.wishlist.brand);
  const collection = useSelector((state) => state.wishlist.collection);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'jewelryImages',
      key: 'jewelryImages',
      render: (image, index) => (
        <>
          <Image
            key={index}
            className='!w-[150px] !h-[150px]'
            // src={getImage(image[0]?.id).imageUrl}
            alt=''
          />
        </>
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
      filters: category.map((e) => ({
        text: e.name,
        value: e.name,
      })),
      onFilter: (value, record) => record?.category?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e.name}</p>,
    },
    {
      title: 'Hãng',
      dataIndex: 'brand',
      key: 'brand',
      filters: brand.map((e) => ({
        text: e.name,
        value: e.name,
      })),
      onFilter: (value, record) => record?.brand?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e.name}</p>,
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: 'collection',
      key: 'collection',
      filters: collection.map((e) => ({
        text: e.name,
        value: e.name,
      })),
      onFilter: (value, record) => record?.collection?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e.name}</p>,
    },
    {
      title: 'Chất liệu',
      dataIndex: 'jewelryMaterials',
      key: 'jewelryMaterials',
      filters: [
        {
          text: 'Gold',
          value: 'Gold',
        },
        {
          text: 'Silver',
          value: 'Silver',
        },
      ],
      onFilter: (value, record) =>
        record.jewelryMaterials.some(
          (material) => material.material.name === value
        ),
      filterSearch: true,
      render: (jewelryMaterials) =>
        jewelryMaterials.map((material) => (
          <Tag key={material.id}>{material.material.name}</Tag>
        )),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      render: (data) => (
        <Dropdown overlay={getMenu(data.id, data.status)} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];
  const handleAddAuctionClick = (id) => {
    setOpen(true);
    dispatch(setJewelryId(id));
  };

  const getMenu = (id, status) => (
    <Menu>
      <Menu.Item
        key='0'
        disabled={status === 'AUCTIONING' ? true : false}
        title={status === 'AUCTIONING' ? 'Sản phẩm đang tham gia đấu giá' : ''}
      >
        <a onClick={() => handleAddAuctionClick(id)}>Thêm vào đấu giá</a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    const fetchJewelryMe = async () => {
      try {
        setLoading(true);
        const response = await wishlistApi.getJewelryByMe();
        setJewelryData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJewelryMe();
  }, []);
  return (
    <>
      <ModalAddAuction open={open} setOpen={setOpen} />
      <Table loading={loading} dataSource={jewelryData} columns={columns} />
    </>
  );
};
