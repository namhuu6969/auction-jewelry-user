import { useState } from 'react';
import { Checkbox, AutoComplete, Input, Typography, DatePicker, Space, Button } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const FilterAuctions = ({
  category,
  brands,
  data,
  prevData,
  setFilteredData,
  handleInputSearch,
}) => {
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedConditions, setCheckedConditions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const handleTypeChange = (list) => {
    setCheckedTypes(list);
  };

  const handleBrandChange = (list) => {
    setCheckedBrands(list);
  };

  const handleConditionChange = (list) => {
    setCheckedConditions(list);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const searchResults = data
      .filter((item) => item.jewelry.name.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item.jewelry.name }));
    setSearchOptions(searchResults);
  };

  const onSelect = (value) => {
    setSearchValue(value);
  };

  const onDateChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
  };

  const handleSubmit = () => {
    let filteredData = data;
    const hasFilters =
      searchValue ||
      checkedTypes.length > 0 ||
      checkedBrands.length > 0 ||
      checkedConditions.length > 0 ||
      dateRange.length > 0;

    if (hasFilters) {
      if (searchValue) {
        filteredData = filteredData.filter((item) =>
          item.jewelry.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (checkedTypes.length > 0) {
        filteredData = filteredData.filter((item) =>
          checkedTypes.includes(item.jewelry.category.name)
        );
      }

      if (checkedBrands.length > 0) {
        if (checkedBrands.includes('Other')) {
          setFilteredData(prevData);
        } else {
          filteredData = filteredData.filter((item) =>
            checkedBrands.includes(item.jewelry.brand.name)
          );
        }
      }

      if (checkedConditions.length > 0) {
        filteredData = filteredData.filter((item) =>
          checkedConditions.includes(item.jewelry.jewelryCondition)
        );
      }

      if (dateRange.length > 0) {
        const [startDate, endDate] = dateRange;
        console.log(startDate, endDate);
        filteredData = filteredData.filter((item) => {
          const auctionDate = new Date(item.auctionDate);
          return auctionDate >= new Date(startDate) && auctionDate <= new Date(endDate);
        });
      }
    } else {
      setFilteredData(prevData);
      return;
    }
    setFilteredData(filteredData);
  };

  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Search Jewelry
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>

      <div className='w-full mb-4'>
        <AutoComplete
          options={searchOptions}
          onSearch={handleSearch}
          onSelect={onSelect}
          style={{ width: '100%' }}
        >
          <Input.Search placeholder='Search by title' enterButton />
        </AutoComplete>
      </div>

      <div className='w-full mb-4'>
        <Title level={3}>
          Types
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group className='flex-start' options={category} onChange={handleTypeChange} />
      </div>

      <div className='w-full my-4'>
        <Title level={3}>
          Brands
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group options={brands} onChange={handleBrandChange} />
      </div>

      <div className='w-full my-4'>
        <Title level={3}>
          Condition
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group
          className='!justify-start'
          options={['New', 'Used', 'Like New']}
          onChange={handleConditionChange}
        />
      </div>

      <div className='w-full my-4'>
        <Space direction='vertical' size={12}>
          <RangePicker onChange={onDateChange} style={{ width: '100%' }} />
        </Space>
      </div>

      <div className='w-full' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
