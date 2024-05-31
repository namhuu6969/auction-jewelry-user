import { Layout, Menu, Checkbox, List, Card } from 'antd';
import { useState } from 'react';

const { Header, Content, Sider } = Layout;

const data = [
  { title: 'Product 1', feature: 'Feature A' },
  { title: 'Product 2', feature: 'Feature B' },
  { title: 'Product 3', feature: 'Feature A' },
  { title: 'Product 4', feature: 'Feature C' },
];

export const Category = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFilterChange = (checkedValues) => {
    setSelectedFeatures(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => checkedValues.includes(item.feature)));
    }
  };
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
        <h1>Categories Page</h1>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key='1'>Category 1</Menu.Item>
            <Menu.Item key='2'>Category 2</Menu.Item>
            <Menu.Item key='3'>Category 3</Menu.Item>
          </Menu>
          <div style={{ padding: '10px' }}>
            <h3>Filter by Feature</h3>
            <Checkbox.Group
              options={['Feature A', 'Feature B', 'Feature C']}
              onChange={handleFilterChange}
            />
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={filteredData}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.title}>{item.feature}</Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
