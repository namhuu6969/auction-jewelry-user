import { Dropdown, Image, Menu, Space, Table } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyAuctionData } from '../../../../../core/store/WishlistStore/MyAuctionStore/myAuction';
import { myAuctionApi } from '../../../../../services/api/WishlistApi/myAuctionApi';
import { useNavigate } from 'react-router-dom';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import { getImage } from '../../../../../utils/utils';

export const MyAuctionTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auctionData = useSelector((state) => state.myAuction.myAuctionData);
  const numberFormatter = new Intl.NumberFormat('vi-VN');
  const calculateRemainingDays = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? daysDiff : 'Phiên đã kết thúc';
  };
  const columns = [
    {
      title: 'Ảnh',
      key: 'image',
      render: (data) => (
        <>
          <Image
            className='!w-[150px] !h-[150px]'
            src={`http://localhost:8080/uploads/jewelry/${images[data.id]}`}
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
      dataIndex: ['jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Giá khởi điểm',
      dataIndex: ['jewelry', 'staringPrice'],
      key: 'staringPrice',
      sorter: (a, b) => a?.staringPrice - b?.staringPrice,
      render: (data) => <p>{numberFormatter.format(data)} VND</p>,
    },
    {
      title: 'Giá hiện tại',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      sorter: (a, b) => a.currentPrice - b.currentPrice,
      render: (data) => <p>{numberFormatter.format(data)} VND</p>,
    },
    {
      title: 'Bước nhảy',
      dataIndex: 'step',
      key: 'step',
      sorter: (a, b) => a.step - b.step,
      render: (data) => <p>{numberFormatter.format(data)} VND</p>,
    },
    {
      title: 'Số người tham gia',
      dataIndex: 'totalBids',
      key: 'totalBids',
      align: 'center',
      sorter: (a, b) => a.totalBids - b.totalBids,
    },
    {
      title: 'Số ngày còn lại',
      dataIndex: 'endTime',
      align: 'center',
      key: 'endTime',
      render: (data) =>
        data ? <p>{calculateRemainingDays(data)} ngày</p> : 'NaN',
      sorter: (a, b) =>
        calculateRemainingDays(a?.endTime) - calculateRemainingDays(b?.endTime),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành dộng',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (data) => (
        <Dropdown overlay={getMenu(data.id)} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const getMenu = (id) => (
    <Menu>
      <Menu.Item key='0'>
        <a onClick={() => navigate(`/jewelry/detail/${id}`)}>
          Xem chi tiết đấu giá
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await myAuctionApi.getMyAuction();
        fetchImages(response)
        dispatch(setMyAuctionData(response));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchImages = async (jewelryData) => {
      const imageMap = {};
      for (const jewelry of jewelryData) {
        const images = await getImage(jewelry.jewelry.id);
        if (images.length > 0) {
          imageMap[jewelry.id] = images[0].url;
        }
      }
      setImages(imageMap);
    };
    fetchData();
  }, [dispatch]);
  return (
    <Table
      loading={loading}
      dataSource={auctionData}
      columns={columns}
      scroll={{
        x: 2000,
      }}
    />
  );
};
