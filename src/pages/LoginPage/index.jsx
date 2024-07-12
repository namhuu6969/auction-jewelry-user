import { Button, Divider, Flex, Form, Input, Typography, notification } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api/auth/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '../../core/store/Auth/auth';
import { useState } from 'react';
import { ForgotPassword } from './components/ForgotPassword';
import { setUserData } from '../../core/store/PersonalStore/personal';
import { UserServices } from '../../services/api/UserServices/UserServices';

const { Title } = Typography;

export const Login = () => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const [loading, setLoading] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openNotification = (placement, description, message) => {
    notification.error({
      message: message,
      description: description,
      placement,
      duration: 5,
    });
  };
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await authApi.signInApi(values);
      const { accessToken, refreshToken, fullName } = response.data;

      dispatch(setToken({ accessToken, refreshToken, fullName }));
      const userInfo = await UserServices.getProfile();
      const { money, user } = userInfo.data;
      dispatch(setUserData({ money, user }));
      navigate(from);
    } catch (error) {
      const msg = error.response.data.message;
      openNotification('top', msg, 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex vertical>
      <ForgotPassword openForgot={openForgot} setOpenForgot={setOpenForgot} />
      <Flex
        className='w-full z-10 bg-white py-5 fixed top-0 lg:px-[100px] p-10 gap-10'
        justify='left'
        align='center'
      >
        <Title style={{ marginBottom: '0' }} className='font-serif ' level={3}>
          <Link className='!text-black' to={'/'}>
            JEWELRY AUCTION
          </Link>
        </Title>
        <Title style={{ marginBottom: '0' }} className='font-serif !my-auto' level={3}>
          Sign In
        </Title>
      </Flex>
      <div className='w-[100vw] h-[100vh] flex justify-center items-center relative overflow-hidden'>
        <img
          src='https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg'
          className='absolute top-0 left-0 z-1 w-full h-screen'
        />
        <Flex gap={20} className='relative bg-white rounded'>
          <img
            className='lg:block hidden'
            src='https://sahirajewelrydesign.com/cdn/shop/products/tara-clover-necklace-sahira-jewelry-design-290449_grande.jpg?v=1648775322'
          />
          <Flex vertical className='text-left justify-between !font-serif w-[350px] p-5' gap={5}>
            <Title level={2} className='!m-0 !font-serif'>
              Welcome,
            </Title>
            <Title level={3} className='!my-5 !font-serif'>
              Login with your account
            </Title>
            <Form
              initialValues={{
                remember: true,
              }}
              autoComplete='off'
              layout='vertical'
              className='flex gap-10 flex-col !font-sans'
              onFinish={handleLogin}
            >
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Must not be empty !',
                  },
                ]}
                className='!m-0 h-[50px]'
              >
                <Input
                  type='email'
                  placeholder='Enter your email...'
                  className='rounded-none border-0 border-b-[1px] border-black focus:border-b-[1px] focus:border-b-black'
                />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Must not be empty!',
                  },
                ]}
                className='!m-0 h-[50px]'
              >
                <Input.Password
                  placeholder='Enter your password...'
                  className='rounded-none border-0 border-b-[1px] border-black focus:border-b-[1px] focus:border-b-black'
                />
              </Form.Item>

              {/* <Form.Item
                name='remember'
                className='!m-0'
                valuePropName='checked'
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}
              <Link
                className='hover:text-blue-600 text-blue-600 underline'
                onClick={() => setOpenForgot(true)}
              >
                Forgot password?
              </Link>

              <Form.Item className='w-full !m-0'>
                <Button
                  loading={loading}
                  className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
                  type='primary'
                  htmlType='submit'
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <Divider className='!border-solid !border-[#B5B5B5]'>or</Divider>
            <Title className='text-center font-sans' level={5}>
              You do not have an account?
            </Title>
            <Button
              className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
              type='primary'
              htmlType='submit'
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};
