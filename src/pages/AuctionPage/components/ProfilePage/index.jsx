// src/ProfilePage.js
import { useEffect, useState } from 'react';
import { Layout, Avatar, Row, Col, Card, Button, Form, Input, message, Divider, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '../../../../services/api/UserServices/UserServices';
import { ViewTransactions } from './components/ViewTransactions/ViewTransactions';

const imgSrc = 'example.img';
const { Content } = Layout;
const { Meta } = Card;
const { TabPane } = Tabs;

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
      message.success('Funds added successfully!');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error adding funds:', error);
      message.error('Failed to add funds. Please try again.');
    }
  };

  return (
    <Layout className='p-4'>
      <Content style={{ padding: '0 50px' }}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Account Information' key='1'>
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
                    <div className='flex justify-between'>
                      <p>Account Information</p>
                      <EditOutlined />
                    </div>
                  }
                >
                  <div className='p-4'>
                    <div className='flex flex-col space-y-2'>
                      <div className='flex justify-between'>
                        <strong>Full Name:</strong>
                        <div className='w-[11.5rem]'>
                          <p>{userInfo.username}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Address:</strong>
                        <div className='w-[11.5rem]'>
                          <p>{userInfo.address}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Birthday:</strong>
                        <div className='w-[11.5rem]'>
                          <p>{userInfo.date_of_birth}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Email:</strong>
                        <div className='w-[11.5rem]'>
                          <p>{userInfo.email}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Already Verify Email:</strong>
                        <div className='w-[11.5rem]'>
                          {userInfo.email_verified ? (
                            <GoIssueClosed className='text-lg text-green-600 inline' />
                          ) : (
                            <AiOutlineCloseCircle className='text-lg text-red-600 inline' />
                          )}
                        </div>
                      </div>
                      <Divider />
                      <Card className='p-4' title='Add Funds'>
                        <Form form={form} onFinish={handleAddFunds}>
                          <Form.Item
                            name='amount'
                            label='Amount'
                            rules={[
                              { required: true, message: 'Please enter the amount to add.' },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (value >= 1000 && value <= 9999999) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error('Amount must be between 1000 and 9999999.')
                                  );
                                },
                              }),
                            ]}
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
                        <Meta
                          avatar={<Avatar size={120} src={imgSrc} />}
                          title={<p className='text-center mr-14'>Payment Information</p>}
                          description={
                            <>
                              <div className='flex justify-between'>
                                <strong>Card Number:</strong>
                                <div className='w-[11.5rem]'>
                                  <p>{paymentInfo.cardNumber}</p>
                                </div>
                              </div>
                              <div className='flex justify-between'>
                                <strong>Card Holder:</strong>
                                <div className='w-[11.5rem]'>
                                  <p>{paymentInfo.cardHolder}</p>
                                </div>
                              </div>
                              <div className='flex justify-between'>
                                <strong>Expiry Date:</strong>
                                <div className='w-[11.5rem]'>
                                  <p>{paymentInfo.expiryDate}</p>
                                </div>
                              </div>
                              <div className='flex justify-between'>
                                <strong>Wallet:</strong>
                                <div className='w-[11.5rem] flex align-center'>
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
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='Transactions' key='2'>
            <ViewTransactions />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};
