import { Result } from 'antd';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const VerifiedPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchVerify = async () => {
      try {
        await axios.get(
          `http://apijewelryauction.techx.id.vn:8081/api/v1/user/verify?userId=${userId}&token=${token}`
        );
        setStatus(true);
      } catch (error) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    };
    fetchVerify();
  }, [token, userId]);
  return status ? (
    <Result
      className='!font-sans !h-[58vh] flex flex-col justify-center'
      status='success'
      title='Verify Success!'
      subTitle='Please check your account '
      extra={[
        <PrimaryButton key={'login'} onClick={() => navigate('/login')}>
          Go to login
        </PrimaryButton>,
      ]}
    />
  ) : (
    <Result
      className='!font-sans !h-[58vh] flex flex-col justify-center'
      status='error'
      title='Verify Error!'
      subTitle={message + '! Please register again'}
      extra={[
        <PrimaryButton key={'login'} onClick={() => navigate('/login')}>
          Go to login
        </PrimaryButton>,
      ]}
    />
  );
};
