  import { Dropdown, Image, Menu, Space, Table } from 'antd';
  import useTableSearch from '../../../../../hooks/useTableSearch';
  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { setMyAuctionData } from '../../../../../core/store/WishlistStore/MyAuctionStore/myAuction';
  import { myAuctionApi } from '../../../../../services/api/WishlistApi/myAuctionApi';
import { useNavigate } from 'react-router-dom';

  export const MyAuctionTable = () => {
    const { getColumnSearchProps } = useTableSearch();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
        dataIndex: 'image',
        key: 'image',
        render: (image) => (
          <Image className='!w-[150px] !h-[150px]' src={image} alt='' />
        ),
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
        sorter: (a, b) => a.staringPrice - b.staringPrice,
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
        render: (data) => <p>{calculateRemainingDays(data)} ngày</p>,
        sorter: (a, b) =>
          calculateRemainingDays(a.endTime) - calculateRemainingDays(b.endTime),
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
        <Menu.Item
          key='0'
        >
          <a onClick={() => navigate(`/jewelry/detail/${id}`)}>Xem chi tiết đấu giá</a>
        </Menu.Item>
      </Menu>
    );
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await myAuctionApi.getMyAuction();
          dispatch(setMyAuctionData(response));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [dispatch]);
    return <Table loading={loading} dataSource={auctionData} columns={columns} />;
  };
