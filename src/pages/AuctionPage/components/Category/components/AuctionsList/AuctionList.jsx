import { Button, List } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AuctionList = ({ data, Card }) => {
  const navigate = useNavigate();

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={
              <img
                className='!w-full !h-full !object-cover'
                alt={item.jewelry.name}
                src={`http://localhost:8080/uploads/jewelry/${item.jewelry.thumbnail}`}
              />
            }
          >
            <div className='text-start'>
              <p>{item.jewelry.name}</p>
              <p style={{ fontWeight: '500' }}>
                Trạng thái:{' '}
                {item.status === 'Waiting' ? (
                  <span style={{ color: 'green' }}>Đang chờ</span>
                ) : (
                  <span style={{ color: 'red' }}>Đã kết thúc</span>
                )}
              </p>
            </div>
            <div className='text-end mt-4'>
              <Button
                onClick={() => navigate(`/jewelry/detail/${item.id}`)}
                type='primary'
                key='bid'
              >
                Chi Tiết
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
