import { Dropdown, Image, Menu, Space, Table, Tag } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAddAuction } from './components/ModalAddAuction';
import {
  setJewelryId,
  setJewelryData,
} from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalJewelryDetail } from './components/ModalJewelryDetail';
import { imageURL } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { ModalValuate } from './components/ModalValuate';

export const MyJewelryTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [loading, setLoading] = useState(false);
  const category = useSelector((state) => state.jewelryMe.category);
  const brand = useSelector((state) => state.jewelryMe.brand);
  const collection = useSelector((state) => state.jewelryMe.collection);
  const jewelryData = useSelector((state) => state.jewelryMe.jewelryData);
  const render = useSelector((state) => state.jewelryMe.render);
  const material = useSelector((state) => state.jewelryMe.material);
  const [open, setOpen] = useState(false);
  const [openValuate, setOpenValuate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJewelryMe = async () => {
      try {
        setLoading(true);
        const response = await wishlistApi.getJewelryByMe();
        dispatch(setJewelryData(response));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelryMe();
    if (render) {
      fetchJewelryMe();
    }
  }, [dispatch, render]);

  const handleAddAuctionClick = (id) => {
    setOpen(true);
    dispatch(setJewelryId(id));
  };

  const handleOpenDetail = (id) => {
    setOpenDetail(true);
    dispatch(setJewelryId(id));
  };

  const handleOpenValuate = (id) => {
    setOpenValuate(true);
    dispatch(setJewelryId(id));
  };

  const getMenu = (id, status) => (
    <Menu>
      <Menu.Item
        key='0'
        disabled={status === 'AUCTIONING'}
        title={status === 'AUCTIONING' ? 'Sản phẩm đang tham gia đấu giá' : ''}
      >
        <a onClick={() => handleAddAuctionClick(id)}>Thêm vào đấu giá</a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a onClick={() => handleOpenDetail(id)}>Xem chi tiết</a>
      </Menu.Item>
      <Menu.Item
        key='2'
        disabled={status === 'ONLINE_VALUATED' || status === 'OFFLINE_VALUATING'}
        title={
          status === 'ONLINE_VALUATED' ? 'Sản phẩm đang định giá' : ''
        }
      >
        <a onClick={() => handleOpenValuate(id)}>Định giá sản phẩm</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getColumnSearchDateProps('createdAt'),
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
      render: (data) =>
        data
          ? new Intl.DateTimeFormat('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(data))
          : '',
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
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) => record?.category?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e?.name}</p>,
    },
    {
      title: 'Hãng',
      dataIndex: 'brand',
      key: 'brand',
      filters: brand.map((e) => ({
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) => record?.brand?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e?.name}</p>,
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: 'collection',
      key: 'collection',
      filters: collection.map((e) => ({
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) => record?.collection?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e?.name}</p>,
    },
    {
      title: 'Chất liệu',
      dataIndex: 'jewelryMaterials',
      key: 'jewelryMaterials',
      filters: material.map((e) => ({
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) =>
        record.jewelryMaterials.some(
          (material) => material.material.name === value
        ),
      filterSearch: true,
      render: (jewelryMaterials) => (
        <div className='grid grid-cols-4 gap-1'>
          {jewelryMaterials.map((material) => (
            <Tag key={material.id} className='col-span-2 text-center w-full'>
              {material.material.name}
            </Tag>
          ))}
        </div>
      ),
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
      fixed: 'right',
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

  return (
    <>
      <ModalValuate open={openValuate} setOpen={setOpenValuate} />
      <ModalAddAuction open={open} setOpen={setOpen} />
      <ModalJewelryDetail open={openDetail} setOpen={setOpenDetail} />
      <Table
        scroll={{
          x: 1500,
        }}
        loading={loading}
        dataSource={[...jewelryData]}
        columns={columns}
      />
    </>
  );
};
