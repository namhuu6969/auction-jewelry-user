import {
  Button,
  Descriptions,
  Dropdown,
  Image,
  Menu,
  Modal,
  Space,
  Table,
} from 'antd';
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
import useSWR from 'swr';
import { useNotification } from '../../../../../hooks/useNotification';
import TitleLabel from '../../../../../components/ui/TitleLabel';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const fetch = async () => {
  const response = await myAuctionApi.getMyAuction();
  const sortedData = response.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedData;
};

export const MyAuctionTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { data, error, isLoading, mutate } = useSWR('my-auction-data', fetch);
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [auction, setAuction] = useState({});
  const [type, setType] = useState('');
  const [id, setId] = useState(null);
  const [updateType, setUpdateType] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const render = useSelector((state) => state.jewelryMe.render);
  const { openNotification, contextHolder } = useNotification();

  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(4);

  const calculateRemainingDays = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? daysDiff : 'Is ending';
  };

  const filterStatus = [
    {
      text: 'Waiting',
      value: 'Waiting',
    },
    {
      text: 'In Progress',
      value: 'InProgress',
    },
    {
      text: 'Completed',
      value: 'Completed',
    },
    {
      text: 'Cancel',
      value: 'Cancel',
    },
    {
      text: 'WaitingConfirm',
      value: 'WaitingConfirm',
    },
    {
      text: 'Fail',
      value: 'Fail',
    },
  ];

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
            {calculateRemainingDays(data) === 'The auction have been ended'
              ? 'The auction have been ended'
              : calculateRemainingDays(data) + ' days'}
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
      filters: filterStatus,
      onFilter: (value, record) => record?.status.startsWith(value),
      filterSearch: true,
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
    setOpenUpdate(true);
    setUpdateType('Update');
    dispatch(setDataUpdate(data));
  };

  const handleReAuction = (data) => {
    setOpenUpdate(true);
    setUpdateType('ReAuction');
    dispatch(setDataUpdate(data));
  };

  const getMenu = (id, status, data) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => navigate(`/jewelry/detail/${id}`)}>
          View detail session
        </a>
      </Menu.Item>
      <Menu.Item key={'update'} disabled={status !== 'Waiting' ? true : false}>
        <a onClick={() => handleUpdateOpen(data)}>Update date range session</a>
      </Menu.Item>
      {(status === 'WaitingConfirm' || status === 'Waiting') && (
        <Menu.Item key={'cancel'}>
          <a className='!text-red-500' onClick={() => handleCancelOpen(id)}>
            Cancel Auction
          </a>
        </Menu.Item>
      )}
      {status === 'WaitingConfirm' && (
        <Menu.Item key={'confirm'}>
          <a
            className='!text-green-500'
            onClick={() => handleConfirmOpen(id, data)}
          >
            Confirm Auction
          </a>
        </Menu.Item>
      )}
      {(status === 'Cancel' || status === 'Fail') && (
        <Menu.Item key={'reauction'}>
          <a onClick={() => handleReAuction(data)}>Re-auction</a>
        </Menu.Item>
      )}
    </Menu>
  );

  const handleCancelOpen = (id) => {
    setId(id);
    setOpenCancel(true);
    setType('Cancel');
  };

  const handleConfirmOpen = (id, data) => {
    setId(id);
    setType('Confirm');
    setAuction(data);
    setOpenCancel(true);
  };

  useEffect(() => {
    if (data) {
      dispatch(setMyAuctionData(data));
    }
    if (render === true) {
      mutate();
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
      <ModalUpdateDate
        open={openUpdate}
        setOpen={setOpenUpdate}
        revalidate={mutate}
        type={updateType}
      />
      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        scroll={{
          x: 2000,
        }}
        pagination={{ pageSize: pageSize }}
      />
      <ModalCancel
        open={openCancel}
        setOpen={setOpenCancel}
        id={id}
        mutate={mutate}
        type={type}
        auction={auction}
      />
    </>
  );
};

const ModalCancel = ({ id, open, setOpen, mutate, type, auction }) => {
  const { openNotification, contextHolder } = useNotification();

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelAuction = async () => {
    try {
      const response = await myAuctionApi.cancelAuction(id);
      openNotification({
        type: 'success',
        description: response.message,
      });
      handleClose();
      mutate();
    } catch (error) {
      openNotification({
        type: 'error',
        description: error.response.data.message,
      });
    }
  };
  const handleConfirmAuction = async () => {
    try {
      const response = await myAuctionApi.confirmAuction(id);
      openNotification({
        type: 'success',
        description: response.message,
      });
      handleClose();
      mutate();
    } catch (error) {
      openNotification({
        type: 'error',
        description: error.response.data.message,
      });
    }
  };
  const items = [
    {
      key: 'name',
      label: 'Name',
      children: auction?.winner?.full_name,
      span: 2,
    },
    {
      key: 'email',
      label: 'Email',
      children: auction?.winner?.email,
      span: 2,
    },
    {
      key: 'phone',
      label: 'Phone number',
      children: auction?.winner?.phone_number,
      span: 2,
    },
    {
      key: 'verified',
      label: 'Verified',
      children: auction?.winner?.email_verified ? (
        <GoIssueClosed className='text-2xl text-green-500' />
      ) : (
        <AiOutlineCloseCircle className='text-2xl text-red-500' />
      ),
      span: 2,
    },
  ];
  return (
    <>
      {contextHolder}
      {type === 'Cancel' && (
        <Modal
          open={open}
          title='Do you want cancel this auction'
          onCancel={handleClose}
          footer={[
            <Button
              onClick={handleCancelAuction}
              key={'cancel'}
              className='bg-red-500 border-none !text-white hover:!bg-red-500'
            >
              Cancel this auction
            </Button>,
          ]}
        ></Modal>
      )}
      {type === 'Confirm' && (
        <Modal
          width={type === 'Confirm' ? 1000 : 500}
          open={open}
          title='Check your auction current price'
          onCancel={handleClose}
          footer={[
            <Button
              onClick={handleCancelAuction}
              key={'cancel'}
              className='bg-red-500 border-none !text-white hover:!bg-red-500'
            >
              Denied this price
            </Button>,
            <Button
              onClick={handleConfirmAuction}
              key={'confirm'}
              className='bg-green-500 border-none !text-white hover:!bg-green-500'
            >
              Confirm this price
            </Button>,
          ]}
        >
          <div className='flex flex-col gap-2'>
            <TitleLabel>
              Name: <span className='font-bold'> {auction?.jewelry?.name}</span>
            </TitleLabel>
            <TitleLabel>
              Starting Price:
              <span className='font-bold'>
                {' '}
                {formatPriceVND(auction?.jewelry?.staringPrice)}
              </span>
            </TitleLabel>
            <TitleLabel>
              Current Price:
              <span className='font-bold'>
                {' '}
                {formatPriceVND(auction?.currentPrice)}
              </span>
            </TitleLabel>
            <Descriptions title='Winner:' bordered items={items} />
          </div>
        </Modal>
      )}
    </>
  );
};
