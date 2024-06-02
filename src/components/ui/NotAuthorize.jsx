import { Button, Flex, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const NotAuthorize = () => {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto !h-[58vh]'>
      <Result
        status='warning'
        title={
          <Title level={4} className='font-sans'>
            Bạn cần đăng nhập để truy cập 
          </Title>
        }
        subTitle={
          <Title level={5} className='font-sans'>
            Đăng nhập hoặc Tiếp tục ở trang chủ
          </Title>
        }
      />
      <Flex className='gap-10' justify='center'>
        <Button key='back' onClick={() => navigate('/login')}>
          Đăng nhập ngay
        </Button>

        <Button
          key='submit'
          type='primary'
          className='bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
          onClick={() => navigate('/')}
        >
          Trở lại trang chủ
        </Button>
      </Flex>
    </div>
  );
};

export default NotAuthorize;
