import { Card, Typography } from 'antd';
const { Title } = Typography;

const PolicyRequest = () => {
  return (
    <Card
      title={<Title level={3} className='font-serif'>Chính sách yêu cầu sản phẩm</Title>}
      className='!text-left text-red-600 text-base'
      bordered={false}
      style={{ width: '100%', margin: '20px 0' }}
    >
      <p>
        <strong>
          * Mọi sản phẩm được gửi yêu cầu phải chính xác với sản phẩm vật lý
          100%
        </strong>
      </p>
      <p>
        <strong>
          * Sản phẩm được đăng ký phải là sản phẩm hợp pháp, có giấy tờ đầy đủ.
        </strong>{' '}
        (Trong trường hợp sản phẩm không có giấy tờ, quý khách hàng phải gửi sản
        phẩm tới công ty của chúng tôi để tiến hành thẩm định)
      </p>
    </Card>
  );
};

export default PolicyRequest;
