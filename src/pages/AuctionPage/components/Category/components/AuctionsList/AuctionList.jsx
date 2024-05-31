import { Button, List } from 'antd';

export const AuctionList = ({ data, Card }) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={
              <img className='!w-full !h-full object-cover' alt={item.name} src={item.imageUrl} />
            }
          >
            <div className='text-start'>
              <p>{item.name}</p>
              <p style={{ fontWeight: '500' }}>
                Trạng thái:{' '}
                {item.startingPrice > 200 ? (
                  <span style={{ color: 'green' }}>Đang diễn ra</span>
                ) : (
                  <span style={{ color: 'red' }}>Đã kết thúc</span>
                )}
              </p>
            </div>
            <div className='text-end mt-4'>
              <Button type='primary' key='bid'>
                Chi Tiết
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
