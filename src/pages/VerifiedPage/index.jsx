import { Result } from 'antd';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const VerifiedPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      className='!font-sans !h-[58vh] flex flex-col justify-center'
      status='success'
      title='Verify Success!'
      subTitle='Now you can login with your account'
      extra={[
        <PrimaryButton key={'login'} onClick={() => navigate('/login')}>
          Go to login
        </PrimaryButton>,
      ]}
    />
  );
};
