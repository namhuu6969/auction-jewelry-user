import { Dropdown, Image, Menu, Space, Table } from 'antd';
import useTableSearch from '@hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyAuctionData } from '@core/store/WishlistStore/MyAuctionStore/myAuction';
import { myAuctionApi } from '@api/WishlistApi/myAuctionApi';
import { useNavigate } from 'react-router-dom';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { formatPriceVND, imageURL } from '../../../../../utils/utils';
import { ModalUpdateDate } from './components/ModalUpdateDate';
import { setDataUpdate } from '../../../../../core/store/WishlistStore/MyAuctionStore/myAuction';
import { renderStatusAuction } from '../../../../../utils/RenderStatus/renderStatusUtil';

export const MyAuctionTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [loading, setLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
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
    return daysDiff > 0 ? daysDiff : 'Is ending';
  };

  const columns = [
    {
      title: '',
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
      title: 'Start Date',
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
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps(['jewelry', 'name']),
    },
    {
      title: 'Starting Price',
      dataIndex: ['jewelry', 'staringPrice'],
      key: 'staringPrice',
      sorter: (a, b) => a?.staringPrice - b?.staringPrice,
      render: (data) => <p>{formatPriceVND(data)}</p>,
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      sorter: (a, b) => a?.currentPrice - b?.currentPrice,
      render: (data) => <p>{formatPriceVND(data)}</p>,
    },
    {
      title: 'Step',
      dataIndex: 'step',
      key: 'step',
      sorter: (a, b) => a?.step - b?.step,
      render: (data) => <p>{formatPriceVND(data)}</p>,
    },
    {
      title: 'Total bidding',
      dataIndex: 'totalBids',
      key: 'totalBids',
      align: 'center',
      sorter: (a, b) => a?.totalBids - b?.totalBids,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      align: 'center',
      key: 'endTime',
      render: (data) =>
        data ? (
          <p>
            {calculateRemainingDays(data) === 'dThe auction have been ende'
              ? 'The auction have been ended'
              : calculateRemainingDays(data) + ' days'}{' '}
          </p>
        ) : (
          'NaN'
        ),
      sorter: (a, b) =>
        calculateRemainingDays(a?.endTime) - calculateRemainingDays(b?.endTime),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => renderStatusAuction(data),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (data) => (
        <Dropdown
          overlay={getMenu(data.id, data.status, data)}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const handleUpdateOpen = (data) => {
    setOpenUpdate(true), dispatch(setDataUpdate(data));
  };

  const getMenu = (id, status, data) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => navigate(`/jewelry/detail/${id}`)}>
          View detail session
        </a>
      </Menu.Item>
      <Menu.Item
        key={'update'}
        disabled={status === 'InProgress' || status === 'Completed' ? true : false}
      >
        <a onClick={() => handleUpdateOpen(data)}>Update date range session</a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await myAuctionApi.getMyAuction();
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (sortedData) {
          dispatch(setMyAuctionData(sortedData));
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
      <ModalUpdateDate open={openUpdate} setOpen={setOpenUpdate} />
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
