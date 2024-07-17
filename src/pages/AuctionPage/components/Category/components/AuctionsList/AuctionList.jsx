import { Button, List, Skeleton, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { formatPriceVND } from '@utils/utils';

export const AuctionList = ({ data, loading }) => {
  const navigate = useNavigate();

  const handleShowStatus = (item) => {
    if (item.status === 'InProgress') {
      return <span style={{ color: '#0000FF' }}>In Progress</span>;
    } else if (item.status === 'Completed') {
      return <span style={{ color: '#008000' }}>Completed</span>;
    } else if (item.status === 'Waiting') {
      return <span style={{ color: '#808080' }}>Waiting</span>;
    } else if (item.status === 'Cancel') {
      return <span style={{ color: '#FFA500' }}>Cancel</span>;
    } else {
      return <span style={{ color: '#FF0000' }}>Fail</span>;
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={loading ? [1, 2, 3, 4, 5, 6, 7, 8] : data}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={
              loading ? (
                <Skeleton.Image style={{ width: '100%', height: '200px' }} />
              ) : (
                <img
                  className='!w-full !h-full !object-cover'
                  alt={item.jewelry.name}
                  src={`http://167.71.212.203:8080/uploads/jewelry/${item.jewelry.thumbnail}`}
                />
              )
            }
          >
            {loading ? (
              <Skeleton active />
            ) : (
              <div className='p-2'>
                <div className='text-start'>
                  <p>{item.jewelry.name}</p>
                  <p style={{ fontWeight: '500' }}>Status: {handleShowStatus(item)}</p>
                </div>
                <div className='text-start'>
                  <p style={{ fontWeight: '500' }}>
                    Current Price: {formatPriceVND(item.currentPrice)}
                  </p>
                </div>
                <div className='text-end mt-4'>
                  <Button
                    onClick={() => navigate(`/jewelry/detail/${item.id}`)}
                    type='primary'
                    key='bid'
                  >
                    More Detail
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </List.Item>
      )}
    />
  );
};
