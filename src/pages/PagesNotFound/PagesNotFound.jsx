import { Result, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const PagesNotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Flex className='w-full h-full' justify='center' align='center'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </Flex>
  );
};
