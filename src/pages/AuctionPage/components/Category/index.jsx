import { useEffect, useState } from 'react';
import { Layout, List, Card } from 'antd';
import { FilterAuctions } from './components/FilterAuctions/FilterAuctions';
import { StatusAuctions } from './components/StatusAuctions/StatusAuctions';
import { IncomingAuctions } from './components/IncomingAuctions/IncomingAuctions';
import { AuctionList } from './components/AuctionsList/AuctionList';
import { requestJewelryApi } from '@api/RequestApi/requestJewelryApi';
import { auctionApi } from '@api/AuctionServices/AuctionApi/AuctionApi';
const { Header, Content, Sider } = Layout;

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

export const Category = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [auctionData, setAuctionData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  const onChanges = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  useEffect(() => {
    const fetchApiCategory = async () => {
      try {
        const response = await requestJewelryApi.getCategory();
        setCategory(response.data.map((item) => item.name));
        console.log(category);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBrand = async () => {
      try {
        const response = await requestJewelryApi.getBrand();
        const brandsFilter = response.data.filter((item) => item.name !== null);
        setBrands(brandsFilter.map((item) => item.name));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAllAuctions();
        setAuctionData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
    fetchApiCategory();
    fetchBrand();
  }, []);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFilterChange = (checkedValues) => {
    setSelectedFeatures(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredData(auctionData);
    } else {
      setFilteredData(auctionData.filter((item) => checkedValues.includes(item.feature)));
    }
  };

  const handleInputSearch = (value) => {
    // Handle input search if needed
    console.log(value);
    if (value === '') setFilteredData(auctionData);
    const filterData = auctionData.filter((item) =>
      item.jewelry.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filterData);
  };

  const handleCategoryFilter = (value) => {
    console.log(value);
    if (value === '') setFilteredData(auctionData);
    const filterData = auctionData.filter((item) =>
      item.jewelry.category.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filterData);
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header style={{ background: '#fff', padding: 0, textAlign: 'center', height: 400 }}>
        <img src='images/banner.png' alt='banner' width={'100%'} className='object-cover' />
      </Header>
      <Layout>
        <Sider className='!flex-col !justify-between' width={'25%'} style={{ background: '#fff' }}>
          <FilterAuctions
            category={category}
            brands={brands}
            onChange={onChanges}
            data={filteredData}
            setFilteredData={setFilteredData}
            handleInputSearch={handleInputSearch}
          />
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
            <AuctionList data={filteredData} Card={Card} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
