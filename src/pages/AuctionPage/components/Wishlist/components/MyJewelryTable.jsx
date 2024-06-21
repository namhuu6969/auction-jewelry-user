import { Dropdown, Image, Menu, Space, Table, Tag } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setJewelryId,
  setJewelryData,
} from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalJewelryDetail } from './components/ModalJewelryDetail';
import { imageURL } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { ModalValuate } from './components/ModalValuate';
import { ModalConfirmDelete } from './components/ModalConfirmDelete';
import { myJewelryApi } from '../../../../../services/api/WishlistApi/myJewelryApi';
import { useNotification } from '../../../../../hooks/useNotification';

export const MyJewelryTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const category = useSelector((state) => state.jewelryMe.category);
  const brand = useSelector((state) => state.jewelryMe.brand);
  const collection = useSelector((state) => state.jewelryMe.collection);
  const jewelryData = useSelector((state) => state.jewelryMe.jewelryData);
  const render = useSelector((state) => state.jewelryMe.render);
  const material = useSelector((state) => state.jewelryMe.material);
  const [openValuate, setOpenValuate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState(0);
  const { openNotification, contextHolder } = useNotification();
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

  const handleConfirmDelete = (id) => {
    setOpenConfirm(true);
    setId(id);
  };

  const handleDeleteJewelry = async (id) => {
    try {
      await myJewelryApi.deleteJewelryApi(id);
      const updatedJewelry = jewelryData.filter((element) => element.id !== id);
      dispatch(setJewelryData(updatedJewelry));
      openNotification({
        type: 'success',
        description: 'Xóa thành công',
      });
    } catch (error) {
      console.log(error);
      openNotification({
        type: 'error',
        description: error.response.data.message,
      });
    }
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
      <Menu.Item key='0'>
        <a onClick={() => handleOpenDetail(id)}>Xem chi tiết</a>
      </Menu.Item>
      <Menu.Item
        key='1'
        disabled={
          status === 'ONLINE_VALUATED' ||
          status === 'OFFLINE_VALUATING' ||
          status === 'AUCTIONING'
        }
        title={
          (status === 'ONLINE_VALUATED' && 'Sản phẩm đang định giá') ||
          (status === 'OFFLINE_VALUATING' && 'Sản phẩm đang định giá') ||
          (status === 'AUCTIONING' && 'Sản phẩm đã được đấu giá')
        }
      >
        <a onClick={() => handleOpenValuate(id)}>Định giá sản phẩm</a>
      </Menu.Item>
      <Menu.Item
        key='2'
        disabled={
          status === 'ONLINE_VALUATED' ||
          status === 'OFFLINE_VALUATING' ||
          status === 'AUCTIONING'
        }
        title={
          (status === 'ONLINE_VALUATED' && 'Sản phẩm đang định giá') ||
          (status === 'OFFLINE_VALUATING' && 'Sản phẩm đang định giá') ||
          (status === 'AUCTIONING' && 'Sản phẩm đã được đấu giá')
        }
      >
        <a onClick={() => handleConfirmDelete(id)}>Xóa trang sức</a>
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
      render: (e, index) => (
        <p key={index}>{e?.name ? e?.name : 'Không biết'}</p>
      ),
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
      render: (e, index) => (
        <p key={index}>{e?.name ? e?.name : 'Không biết'}</p>
      ),
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
      render: (e, index) => (
        <p key={index}>{e?.name ? e?.name : 'Không biết'}</p>
      ),
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
      {contextHolder}
      <ModalConfirmDelete
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirm={confirm}
        setConfirm={setConfirm}
        deleteFunction={() => handleDeleteJewelry(id)}
        loading={loadingDelete}
        setLoading={setLoadingDelete}
      />
      <ModalValuate open={openValuate} setOpen={setOpenValuate} />
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
