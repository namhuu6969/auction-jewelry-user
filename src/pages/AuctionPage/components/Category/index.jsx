import { useEffect, useState } from 'react';
import { Layout, List, Card } from 'antd';
import { FilterAuctions } from './components/FilterAuctions/FilterAuctions';
import { StatusAuctions } from './components/StatusAuctions/StatusAuctions';
import { IncomingAuctions } from './components/IncomingAuctions/IncomingAuctions';
import { AuctionList } from './components/AuctionsList/AuctionList';
import axios from 'axios';
const { Header, Content, Sider } = Layout;

const endpoint = 'https://664e0a97fafad45dfaded0e5.mockapi.io/api/v1/auction-list';

const options = [
  {
    label: 'Vàng',
    value: 'Gold',
  },
  {
    label: 'Hột Xoàn',
    value: 'Pearl',
  },
  {
    label: 'Kim Cương',
    value: 'Diamond',
  },
];

const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};

export const Category = () => {
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        setAuctionData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const [filteredData, setFilteredData] = useState(auctionData);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFilterChange = (checkedValues) => {
    setSelectedFeatures(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredData(auctionData);
    } else {
      setFilteredData(auctionData.filter((item) => checkedValues.includes(item.feature)));
    }
  };
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
        <h1>Categories Page</h1>
      </Header>
      <Layout>
        <Sider className='!flex-col !justify-between' width={'25%'} style={{ background: '#fff' }}>
          <FilterAuctions options={options} onChange={onchange} data={filteredData} />
          <StatusAuctions options={options} onChange={handleFilterChange} />
          <IncomingAuctions data={auctionData} />
        </Sider>
        <Layout>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <AuctionList data={auctionData} Card={Card} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
