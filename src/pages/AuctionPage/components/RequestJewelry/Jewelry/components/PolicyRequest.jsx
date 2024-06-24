import { Card, Typography } from 'antd';
const { Title } = Typography;

const PolicyRequest = () => {
  return (
    <Card
      title={
        <Title level={3} className='font-serif'>
          Policies of send request jewelry
        </Title>
      }
      className='!text-left text-red-600 text-base'
      bordered={false}
      style={{ width: '100%', margin: '20px 0' }}
    >
      <p>
        <strong>
          * Every jewelry that is send have to match the physical jewelry 100%
        </strong>
      </p>
      <p>
        <strong>
          * Registered jewelries must be legal products with complete documents.
        </strong>{' '}
        (In case the jewelry does not have documents, the customer must send the
        jewelry to our company for valuating)
      </p>
    </Card>
  );
};

export default PolicyRequest;
