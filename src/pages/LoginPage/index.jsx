import { Button, Checkbox, Divider, Flex, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Title } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  return (
    <Flex vertical>
      <Flex
        className='w-full z-10 bg-white py-5 lg:px-[100px] p-10 gap-10'
        justify='left'
        align='center'
      >
        <Title style={{ marginBottom: '0' }} className='font-serif ' level={3}>
          <Link className='!text-black' to={'/'}>
            JEWELRY AUCTION
          </Link>
        </Title>
        <Title
          style={{ marginBottom: '0' }}
          className='font-serif !my-auto'
          level={3}
        >
          Login
        </Title>
      </Flex>
      <div className='w-[100vw] h-[91dvh] flex justify-center items-center relative overflow-hidden'>
        <img
          src='https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg'
          className='absolute top-0 left-0 z-1 w-full h-screen'
        />
        <Flex gap={20} className='relative bg-white rounded'>
          <img
            className='lg:block hidden'
            src='https://sahirajewelrydesign.com/cdn/shop/products/tara-clover-necklace-sahira-jewelry-design-290449_grande.jpg?v=1648775322'
          />
          <Flex
            vertical
            className='text-left justify-between !font-serif w-[350px] p-5'
            gap={5}
          >
            <Title level={2} className='!m-0 !font-serif'>
              Welcome
            </Title>
            <Title level={3} className='!my-5 !font-serif'>
              Login your account
            </Title>
            <Form
              initialValues={{
                remember: true,
              }}
              autoComplete='off'
              layout='vertical'
              className='flex gap-10 flex-col !font-sans'
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
                className='!m-0'
              >
                <Input className='rounded-none border-0 border-b-[1px] border-black focus:border-b-[1px] focus:border-b-black' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                className='!m-0'
              >
                <Input.Password className='rounded-none border-0 border-b-[1px] border-black focus:border-b-[1px] focus:border-b-black' />
              </Form.Item>

              <Form.Item
                name='remember'
                className='!m-0'
                valuePropName='checked'
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link
                className='hover:text-blue-600 text-blue-600 underline'
                to={'/'}
              >
                Forget Password?
              </Link>

              <Form.Item className='w-full !m-0'>
                <Button
                  className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
                  type='primary'
                  htmlType='submit'
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Divider className='!border-solid !border-[#B5B5B5]'>or</Divider>
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
