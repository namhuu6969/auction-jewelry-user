import { Card, Typography } from 'antd';
const { Title } = Typography;
import './policy.css';
const PolicyRequest = () => {
  return (
    <Card
      title={
        <Title level={2} className='font-serif'>
          Policies of send request jewelry
        </Title>
      }
      className='!text-left text-red-600 text-base font-sans !font-normal'
      bordered={false}
      style={{ width: '100%', margin: '20px 0' }}
    >
      <p className='!mb-3'>
        <strong className='text-xl font-sans !font-normal '>
          * Every jewelry that is send have to match the physical jewelry 100%
        </strong>
      </p>
      <p>
        <strong className='text-xl font-sans !font-normal '>
          * Registered jewelries must be legal products with complete documents.
        </strong>{' '}
        <span className='text-xl font-sans !font-normal '>
          (In case the jewelry does not have documents, the customer must send the
          jewelry to our company for valuating)
        </span>
      </p>
    </Card>
  );
};

export default PolicyRequest;
