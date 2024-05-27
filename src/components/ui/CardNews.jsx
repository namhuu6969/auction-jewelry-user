import { Card, Flex, Typography } from 'antd';
const { Title } = Typography;

const CardNews = ({ imageUrl, title, description }) => {
  return (
    <Card
      cover={<img alt={title} src={imageUrl} className='w-full object-cover' />}
      bordered={false}
      bodyStyle={{ padding: 0 }}
      className='!w-full !h-full'
    >
      <Flex className='!min-h-full bg-[#F2E7E7] px-5 py-4' vertical>
        <Title className='multi-line-ellipsis !flex-1 text-left font-serif' level={4}>
          {title}
        </Title>
        <Title level={5} className='!flex-1 !text-[#898989] !font-medium text-left font-sans'>
          {description}
        </Title>
      </Flex>
    </Card>
  );
};

export default CardNews;
