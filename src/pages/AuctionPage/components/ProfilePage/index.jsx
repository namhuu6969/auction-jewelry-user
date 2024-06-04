// src/ProfilePage.js
import { Layout, Avatar, Typography, Row, Col, Divider, List, Card, Rate } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const ProfilePage = () => {
  const user = {
    username: 'john_doe',
    profilePic: 'profile-pic.jpg',
    bio: 'Enthusiastic auction lover.',
    location: 'New York, USA',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    memberSince: 'January 1, 2020',
    lastLogin: 'June 4, 2024',
    reputation: 4.5,
    verificationStatus: 'Verified',
    activeListings: ['Antique Vase', 'Vintage Watch'],
    bidHistory: ['Art Piece', 'Old Book'],
    wonAuctions: ['Collectible Coin'],
    soldItems: ['Painting', 'Sculpture'],
    watchlist: ['Rare Stamp', 'Classic Car'],
  };

  return (
    <Layout className='p-4'>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          User Profile
        </Title>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Avatar size={128} src={user.profilePic} />
          </Col>
          <Col span={18}>
            <Title level={3}>{user.username}</Title>
            <Text>{user.bio}</Text>
            <Divider />
            <Text>
              <strong>Location:</strong> {user.location}
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title='Contact Information'>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='Account Information'>
              <p>
                <strong>Member Since:</strong> {user.memberSince}
              </p>
              <p>
                <strong>Last Login:</strong> {user.lastLogin}
              </p>
              <p>
                <strong>Reputation:</strong> <Rate disabled defaultValue={user.reputation} />
              </p>
              <p>
                <strong>Verification Status:</strong> {user.verificationStatus}
              </p>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title='Auction Activity'>
              <List
                header={<div>Active Listings</div>}
                bordered
                dataSource={user.activeListings}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <List
                header={<div>Bid History</div>}
                bordered
                dataSource={user.bidHistory}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title='Completed Transactions'>
              <List
                header={<div>Won Auctions</div>}
                bordered
                dataSource={user.wonAuctions}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <List
                header={<div>Sold Items</div>}
                bordered
                dataSource={user.soldItems}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <List
                header={<div>Watchlist</div>}
                bordered
                dataSource={user.watchlist}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
