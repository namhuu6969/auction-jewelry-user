// src/ProfilePage.js
import { Layout, Avatar, Row, Col, Card, Flex, Button, Form, Input, message, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { UserServices } from '../../../../services/api/UserServices/UserServices';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const imgSrc =
  'data:image/png;base64,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';

const { Content } = Layout;
const { Meta } = Card;

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [showMoney, setShowMoney] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserServices.getProfile();
      const { money, user } = response.data;
      setUserInfo({
        username: user.full_name,
        profilePic: user.imageUrl,
        address: user.address,
        email: user.email,
        email_verified: user.email_verified,
        phone: user.phone_number,
        date_of_birth: user.date_of_birth,
        wallet: money,
      });
    };
    fetchUser();
  }, []);

  const paymentInfo = {
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expiryDate: '12/24',
  };

  const handleShowMoney = () => {
    setShowMoney(!showMoney);
  };

  const handleAddFunds = async (values) => {
    try {
      const response = await UserServices.createPayment(values.amount);
      // Handle response if needed
      message.success('Funds added successfully!');
      console.log(response.data);
      // Optionally, update user information or refresh data
      window.location.href = response.data.url;
    } catch (error) {
      // Handle error
      console.error('Error adding funds:', error);
      message.error('Failed to add funds. Please try again.');
    }
    console.log('Adding funds...');
  };

  return (
    <Layout className='p-4'>
      <Content style={{ padding: '0 50px' }}>
        <Row className='flex justify-between'>
          <Col span={8}>
            <Avatar
              style={{ height: '350px', width: '100%' }}
              shape='square'
              src={userInfo.profilePic || 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'}
            />
          </Col>
          <Col className='flex flex-col justify-between' span={14}>
            <Card
              className='p-4 text-left'
              title={
                <Flex justify='space-between'>
                  <p>Account Information</p>
                  <EditOutlined />
                </Flex>
              }
            >
              <Flex className='p-4' justify='flex-start' vertical>
                <Flex vertical>
                  <Flex justify='space-between'>
                    <strong>Full Name:</strong>
                    <div className='w-[11.5rem] flex justify-start'>
                      <p>{userInfo.username}</p>
                    </div>
                  </Flex>
                  <Flex justify='space-between'>
                    <strong>Address:</strong>
                    <div className='w-[11.5rem] flex justify-start'>
                      <p>{userInfo.address}</p>
                    </div>
                  </Flex>
                  <Flex justify='space-between'>
                    <strong>Birthday:</strong>
                    <div className='w-[11.5rem] flex justify-start'>
                      <p>{userInfo.date_of_birth}</p>
                    </div>
                  </Flex>
                  <Flex justify='space-between'>
                    <strong>Email:</strong>
                    <div className='w-[11.5rem] flex justify-start'>
                      <p>{userInfo.email}</p>
                    </div>
                  </Flex>
                  <Flex justify='space-between'>
                    <strong>Already Verify Email:</strong>
                    <div className='w-[11.5rem] flex justify-start'>
                      {userInfo.email_verified ? (
                        <GoIssueClosed className='text-lg text-green-600 inline' />
                      ) : (
                        <AiOutlineCloseCircle className='text-lg text-red-600 inline' />
                      )}
                    </div>
                  </Flex>
                  <Divider />
                  <Card className='p-4' title='Add Funds'>
                    <Form form={form} onFinish={handleAddFunds}>
                      <Form.Item
                        name='amount'
                        label='Amount'
                        rules={[{ required: true, message: 'Please enter the amount to add.' }]}
                      >
                        <Input type='number' placeholder='Enter amount' />
                      </Form.Item>
                      <Form.Item className='text-right'>
                        <Button type='primary' htmlType='submit'>
                          Add Funds
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                  <Divider />
                  <Card
                    style={{ width: '100%', marginTop: 20 }}
                    actions={[<EditOutlined key='edit' />]}
                  >
                    {/* <Skeleton loading={loading} avatar active> */}
                    <Meta
                      avatar={<Avatar size={120} src={imgSrc} />}
                      title={<p className='text-center mr-14'>Payment Information</p>}
                      description={
                        <>
                          <Flex justify='space-between'>
                            <strong>Card Number:</strong>
                            <div className='w-[11.5rem] flex justify-start'>
                              <p>{paymentInfo.cardNumber}</p>
                            </div>
                          </Flex>
                          <Flex justify='space-between'>
                            <strong>Card Holder:</strong>
                            <div className='w-[11.5rem] flex justify-start'>
                              <p>{paymentInfo.cardHolder}</p>
                            </div>
                          </Flex>
                          <Flex justify='space-between'>
                            <strong>Expiry Date:</strong>
                            <div className='w-[11.5rem] flex justify-start'>
                              <p>{paymentInfo.expiryDate}</p>
                            </div>
                          </Flex>
                          <Flex justify='space-between'>
                            <strong>Wallet:</strong>
                            <div className='w-[11.5rem] flex align-center justify-start'>
                              {showMoney ? (
                                <p>
                                  {'   '}
                                  {userInfo.wallet}
                                  <FaRegEye
                                    onClick={handleShowMoney}
                                    className='text-lg text-red-600 inline ml-2'
                                  />
                                </p>
                              ) : (
                                <p>
                                  xxx{' '}
                                  <FaRegEyeSlash
                                    onClick={handleShowMoney}
                                    className='text-lg text-red-600 inline'
                                  />
                                </p>
                              )}
                            </div>
                          </Flex>
                        </>
                      }
                    />
                    {/* </Skeleton> */}
                  </Card>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
