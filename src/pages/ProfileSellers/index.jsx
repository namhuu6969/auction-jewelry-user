import { useEffect, useState } from 'react';
import { Layout, Avatar, Row, Col, Card, Divider, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { UserServices } from '@api/UserServices/UserServices';
import { useParams } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

export const ProfileSellers = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserServices.getProfileSellerById(id);
        const { data } = response;
        setUserInfo({
          username: data.full_name,
          profilePic: data.imageUrl,
          address: data.address,
          email: data.email,
          email_verified: data.email_verified,
          phone: data.phone_number,
          date_of_birth: data.date_of_birth,
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

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
                        <div className='w-fit'>
                          <p>{userInfo.username}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Phone:</strong>
                        <div className='w-fit'>
                          <p>{userInfo.phone}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Address:</strong>
                        <div className='w-fit'>
                          <p>{userInfo.address}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Birthday:</strong>
                        <div className='w-fit'>
                          <p>{userInfo.date_of_birth}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Email:</strong>
                        <div className='w-fit'>
                          <p>{userInfo.email}</p>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <strong>Already Verify Email:</strong>
                        <div className='w-fit'>
                          {userInfo.email_verified ? (
                            <GoIssueClosed className='text-lg text-green-600 inline' />
                          ) : (
                            <AiOutlineCloseCircle className='text-lg text-red-600 inline' />
                          )}
                        </div>
                      </div>
                      <Divider />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};
