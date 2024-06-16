import { useState } from 'react';
import { Checkbox, AutoComplete, Input, Typography, DatePicker, Space, Button, Flex } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const FilterAuctions = ({ category, brands, data, setFilteredData, handleInputSearch }) => {
  const [checkedList, setCheckedList] = useState([]);
  const onChange = (list) => {
    setCheckedList(list);
  };

  const [searchOptions, setSearchOptions] = useState([]);

  const handleSearch = (value) => {
    const searchResults = data
      .filter((item) => item.jewelry.name.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item.jewelry.name }));
    setSearchOptions(searchResults);
  };

  const onSelect = (value) => {
    // Handle selection of a search result if needed
    // setSelectedFeatures(value);
    console.log(value);
    const filterData = data.filter((item) =>
      item.jewelry.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filterData);
  };

  const onDateChange = (dates, dateStrings) => {
    // Handle date range selection if needed
    console.log('Selected dates: ', dates);
    console.log('Formatted date strings: ', dateStrings);
  };

  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Tìm Kiếm Trang Sức
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>

      <div className='w-full mb-4'>
        <AutoComplete
          options={searchOptions}
          onSearch={handleSearch}
          onSelect={onSelect}
          onChange={handleInputSearch}
          style={{ width: '100%' }}
        >
          <Input.Search placeholder='Search by title' enterButton />
        </AutoComplete>
      </div>

      <div className='w-full mb-4'>
        <Title level={3}>
          Loại Trang Sức
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group
          className='flex-start'
          options={category}
          defaultValue={['Option 1']}
          onChange={onChange}
        />
      </div>

      <div className='w-full my-4'>
        <Title level={3}>
          Theo Hãng
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group options={brands} defaultValue={['Option 1']} onChange={onChange} />
      </div>

      <div className='w-full my-4'>
        <Title level={3}>
          Tình Trạng
          <div className='mt-2 mb-4 border-b-2 border-black w-30' />
        </Title>
        <Checkbox.Group
          className='!justify-start'
          options={['Mới', 'Đã qua sử dụng']}
          defaultValue={['Option 1']}
          onChange={onChange}
        />
      </div>

      <div className='w-full my-4'>
        <Space direction='vertical' size={12}>
          <RangePicker
            placeholder={['Từ Ngày', 'Đến Ngày']}
            onChange={onDateChange}
            style={{ width: '100%' }}
          />
        </Space>
      </div>
      <Flex className='w-full' justify='end'>
        <Button>Lọc</Button>
      </Flex>
    </div>
  );
};
