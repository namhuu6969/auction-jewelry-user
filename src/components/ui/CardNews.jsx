import { Card, Typography } from 'antd';
const { Title } = Typography;

const CardNews = ({ element }) => {
  const coverImage =
    element.blogImages.length > 0
      ? `http://167.71.212.203:8080/uploads/jewelry/${element.blogImages[0].url}`
      : 'http://example.com/image.jpg'; // Use a default image if no blogImages

  return (
    <Card
      cover={<img alt={element.title} src={coverImage} className='w-full h-48 object-cover' />}
      bordered={false}
      bodyStyle={{ padding: 0 }}
      className='w-full h-full'
      hoverable
    >
      <div className='min-h-full bg-[#F2E7E7] px-5 py-4 flex flex-col'>
        <Title className='multi-line-ellipsis flex-1 text-left font-serif' level={4}>
          {element.title}
        </Title>
        <div
          className='flex-1 text-left text-[#898989] font-medium font-sans'
          dangerouslySetInnerHTML={{ __html: element.content }}
        />
        <div className='mt-4 text-right text-sm text-[#898989]'>By {element.user.full_name}</div>
      </div>
    </Card>
  );
};

export default CardNews;
