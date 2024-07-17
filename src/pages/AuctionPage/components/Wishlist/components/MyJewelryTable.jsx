import { Dropdown, Image, Menu, Space, Table, Tag, Tooltip } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setJewelryId,
  setJewelryData,
  setRender,
} from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalJewelryDetail } from './components/ModalJewelryDetail';
import { imageURL } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { ModalValuate } from './components/ModalValuate';
import { ModalConfirmDelete } from './components/ModalConfirmDelete';
import { myJewelryApi } from '../../../../../services/api/WishlistApi/myJewelryApi';
import { useNotification } from '../../../../../hooks/useNotification';
import { ModalOfflineValuate } from './components/ModalOfflineValuate';
import { renderStatusJewelry } from '../../../../../utils/RenderStatus/renderStatusUtil';
import useSWR from 'swr';

const fetch = async () => {
  const response = await wishlistApi.getJewelryByMe();
  const sortedData = response.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedData;
};

export const MyJewelryTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
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
  const [openOfflineValuate, setOpenOfflineValuate] = useState(false);
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState(0);
  const { openNotification, contextHolder } = useNotification();
  const { data, error, isLoading, mutate } = useSWR('my-jewelry-data', fetch);

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
        description: 'Delete successfully',
      });
      dispatch(setRender(true));
    } catch (error) {
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

  const handleOfflineValuate = async (id) => {
    setOpenOfflineValuate(true);
    dispatch(setJewelryId(id));
  };

  const handleErrorForSendValuate = (status) => {
    let error = '';
    switch (status) {
      case 'AUCTIONING':
        return (error = 'This jewelry is auctioning');
      case 'OFFLINE_VALUATING':
        return (error = 'You have send request for offline valuate');
      case 'VALUATING_DELIVERING':
        return (error = 'Jewelry is valuating');
      case 'NOT_PAID':
        return (error = 'You not paid valuating');
    }
    return error;
  };

  const handleErroDelete = (status) => {
    let error = '';
    switch (status) {
      case 'ONLINE_VALUATED':
        return (error = 'Jewelry is valuating');
      case 'OFFLINE_VALUATING':
        return (error = 'Jewelry is valuating');
      case 'AUCTIONING':
        return (error = 'Jewelry is auctioning');
      case 'STORED':
        return (error = 'Jewelry is waited to auction');
      case 'VALUATING_DELIVERING':
        return (error = 'Jewelry is valuating');
      case 'NOT_PAID':
        return (error = 'You not paid valuating');
    }
    return error;
  };

  const getMenu = (id, status) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => handleOpenDetail(id)}>View Detail</a>
      </Menu.Item>
      <Menu.Item key='online'>
        <a onClick={() => handleOpenValuate(id)}>Online Valuate Jewelry</a>
      </Menu.Item>
      <Menu.Item
        key='offline'
        disabled={
          status !== 'PENDING' ? true : false
        }
      >
        <Tooltip
          title={handleErrorForSendValuate(status)}
          overlayStyle={{ whiteSpace: 'pre-line' }}
        >
          <span>
            <a onClick={() => handleOfflineValuate(id)}>
              Offline Valuate Jewelry
            </a>
          </span>
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key='2'
        disabled={
          status !== 'PENDING' && status !== 'NOT_PAID' ? true : false 
        }
      >
        <Tooltip
          title={handleErroDelete(status)}
          overlayStyle={{ whiteSpace: 'pre-line' }}
        >
          <span>
            <a onClick={() => handleConfirmDelete(id)}>Delete Jewelry</a>
          </span>
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: '',
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
      title: 'Created At',
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Category',
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
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      filters: brand.map((e) => ({
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) => record?.brand?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e?.name ? e?.name : 'Other'}</p>,
    },
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      filters: collection.map((e) => ({
        text: e?.name,
        value: e?.name,
      })),
      onFilter: (value, record) => record?.collection?.name?.startsWith(value),
      filterSearch: true,
      render: (e, index) => <p key={index}>{e?.name ? e?.name : 'Other'}</p>,
    },
    {
      title: 'Materials',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => renderStatusJewelry(data),
    },
    {
      title: 'Action',
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
  useEffect(() => {
    if (data) {
      dispatch(setJewelryData(data));
    }
    if (render) {
      mutate();
      dispatch(setRender(false));
    }
    if (error) {
      openNotification({
        type: 'error',
        description: 'Failed to fetch',
      });
    }
  }, [data, dispatch, error, mutate, openNotification, render]);
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
      <ModalOfflineValuate
        open={openOfflineValuate}
        setOpen={setOpenOfflineValuate}
      />
      <ModalValuate open={openValuate} setOpen={setOpenValuate} />
      <ModalJewelryDetail open={openDetail} setOpen={setOpenDetail} />
      <Table
        scroll={{
          x: 1500,
        }}
        loading={isLoading}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 4 }}
      />
    </>
  );
};
