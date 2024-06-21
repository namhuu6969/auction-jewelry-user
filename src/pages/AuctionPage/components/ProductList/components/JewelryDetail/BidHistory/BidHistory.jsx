import { Button, Modal, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { auctionApi } from '@api/AuctionServices/AuctionApi/AuctionApi';
import { formatDateTime, formatPrice } from '@utils/utils';
const { Title } = Typography;

const columns = [
  {
    title: 'Họ và Tên Chủ Thầu',
    dataIndex: 'userName',
    key: 'userName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Thời Gian',
    dataIndex: `bidTime`,
    key: 'bidTime',
  },
  {
    title: 'Giá Tiền Dự Thầu',
    dataIndex: 'bidAmount',
    key: 'bidAmount',
  },
];

export const BidHistory = ({ auctionId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bidHistory, setBidHistory] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await auctionApi.viewAuctionBidHistory(auctionId);
    console.log(response.data);
    setBidHistory(
      response.data.map((item) => ({
        ...item,
        bidTime: formatDateTime(item.bidTime),
        bidAmount: `${formatPrice(item.bidAmount)} VNĐ`,
      }))
    );
    if (response.code === 200) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auctionId]);

  const showLoading = () => {
    setOpen(true);
    fetchData();
  };

  return (
    <>
      <Title
        level={4}
        className='!m-0 font-sans !font-thin hover:underline hover:cursor-pointer'
        onClick={showLoading}
      >
        Xem Lịch Sử
      </Title>
      <Modal
        width={800}
        title={<p>Lịch Sử Đấu Giá</p>}
        footer={
          <Button type='primary' onClick={fetchData}>
            Reload
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        {loading ? (
          <Spin tip='Loading...'>
            <div style={{ minHeight: '100px' }}></div>
          </Spin>
        ) : (
          <Table columns={columns} dataSource={bidHistory} />
        )}
      </Modal>
    </>
  );
};
