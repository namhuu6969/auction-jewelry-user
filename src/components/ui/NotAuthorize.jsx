import { Button, Flex, Modal, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const NotAuthorize = () => {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto h-screen'>
      <Result
        status='warning'
        title={
          <Title level={4} className='font-sans'>
            You need to login to access
          </Title>
        }
        subTitle={
          <Title level={5} className='font-sans'>
            Please login or back to home page
          </Title>
        }
      />
     <Flex className='gap-10' justify='center'>
        <Button key='back' onClick={() => navigate('/login')}>
          Sign in now
        </Button>
        
        <Button key='submit' type='primary' onClick={() => navigate('/')}>
          Back to homepage
        </Button>
     </Flex>
    </div>
  );
};

export default NotAuthorize;
