import { Card } from 'antd';

const { Meta } = Card;

const CardNews = ({ imageUrl, title, description }) => {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={imageUrl} />}
      style={{ width: 300, margin: 'auto' }}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default CardNews;
