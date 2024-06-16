import { Dropdown, Image, Menu, Popconfirm, Space, Spin, Table } from 'antd';
import useTableSearch from '@hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMyAuctionData,
  setRenderMyAuction,
} from '@core/store/WishlistStore/MyAuctionStore/myAuction';
import { myAuctionApi } from '@api/WishlistApi/myAuctionApi';
import { useNavigate } from 'react-router-dom';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { formatPrice, imageURL } from '../../../../../utils/utils';
import { useNotification } from '../../../../../hooks/useNotification';

export const MyAuctionTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const { openNotification, contextHolder } = useNotification();
  const [loading, setLoading] = useState(false);
  const [loadingUpdated, setLoadingUpdated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auctionData = useSelector((state) => state.myAuction.myAuctionData);
  const render = useSelector((state) => state.jewelryMe.render);

  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(4);

  const calculateRemainingDays = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? daysDiff : 'Phiên đã kết thúc';
  };

  const handleChangeStatusAuction = async (id, status) => {
    try {
      if (status === 'Cancel') {
        setLoadingUpdated(true);
      }
      await myAuctionApi.updateMyAuction(id, status);
      if (status === 'Cancel') {
        openNotification({
          type: 'success',
          description: 'Hủy phiên thành công',
        });
      }
      dispatch(setRenderMyAuction(true));
    } catch (error) {
      if (status === 'Cancel') {
        openNotification({
          type: 'error',
          description: 'Hủy phiên thất bại',
        });
      }
    } finally {
      if (status === 'Cancel') {
        setLoadingUpdated(false);
      }
    }
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: ['jewelry', 'thumbnail'],
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
      title: 'Ngày bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchDateProps('startTime'),
      sorter: (a, b) => new Date(a?.startTime) - new Date(b?.startTime),
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
      dataIndex: ['jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Giá khởi điểm',
      dataIndex: ['jewelry', 'staringPrice'],
      key: 'staringPrice',
      sorter: (a, b) => a?.staringPrice - b?.staringPrice,
      render: (data) => <p>{formatPrice(data)} VND</p>,
    },
    {
      title: 'Giá hiện tại',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      sorter: (a, b) => a?.currentPrice - b?.currentPrice,
      render: (data) => <p>{formatPrice(data)} VND</p>,
    },
    {
      title: 'Bước nhảy',
      dataIndex: 'step',
      key: 'step',
      sorter: (a, b) => a?.step - b?.step,
      render: (data) => <p>{formatPrice(data)} VND</p>,
    },
    {
      title: 'Số người tham gia',
      dataIndex: 'totalBids',
      key: 'totalBids',
      align: 'center',
      sorter: (a, b) => a?.totalBids - b?.totalBids,
    },
    {
      title: 'Số ngày còn lại',
      dataIndex: 'endTime',
      align: 'center',
      key: 'endTime',
      render: (data) =>
        data ? (
          <p>
            {calculateRemainingDays(data) === 'Phiên đã kết thúc'
              ? 'Phiên đã kết thúc'
              : calculateRemainingDays(data) + ' ngày'}{' '}
          </p>
        ) : (
          'NaN'
        ),
      sorter: (a, b) => calculateRemainingDays(a?.endTime) - calculateRemainingDays(b?.endTime),
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
        <Dropdown overlay={getMenu(data.id, data.status, data.totalBids)} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const getMenu = (id, status, totalBids) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => navigate(`/jewelry/detail/${id}`)}>Xem chi tiết đấu giá</a>
      </Menu.Item>
      <Menu.Item
        key='1'
        className={`${
          status === 'Inprogess' || status === 'Completed' || status === 'Waiting'
            ? '!hidden'
            : '!block'
        }`}
      >
        <a onClick={() => handleChangeStatusAuction(id, 'Waiting')}>
          Mở phiên đấu giá {loadingUpdated ? <Spin /> : ''}
        </a>
      </Menu.Item>
      <Menu.Item
        key='2'
        className={`${status === 'Completed' || status === 'Cancel' ? '!hidden' : '!block'}`}
        disabled={totalBids > 3 ? true : false}
      >
        <Popconfirm
          title='Hủy phiên đấu giá'
          description='Bạn có chắc là sẽ hủy phiên này?'
          onConfirm={() => handleChangeStatusAuction(id, 'Cancel')}
          okText='Có'
          cancelText='Không'
        >
          <a className='!text-red-600'>Hủy phiên đấu giá {loadingUpdated ? <Spin /> : ''}</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await myAuctionApi.getMyAuction();
        console.log(response.data)
        if (response.data) {
          dispatch(setMyAuctionData(response.data));
        }
      } catch (error) {
        console.error('Error fetching auction data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (render === true) {
      fetchData();
    }
    fetchData();
  }, [dispatch, render]);

  return (
    <>
      {contextHolder}
      <Table
        loading={loading}
        dataSource={auctionData}
        columns={columns}
        scroll={{
          x: 2000,
        }}
        pagination={{ pageSize: pageSize }}
      />
    </>
  );
};
