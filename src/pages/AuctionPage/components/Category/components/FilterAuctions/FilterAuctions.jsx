import { useState } from 'react';
import { Checkbox, AutoComplete, Input, Typography, DatePicker, Space, Button, Flex } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const FilterAuctions = ({ options, onChange, data }) => {
  const [searchOptions, setSearchOptions] = useState([]);

  const handleSearch = (value) => {
    const searchResults = data
      .filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item.title }));
    setSearchOptions(searchResults);
  };

  const onSelect = (value) => {
    // Handle selection of a search result if needed
  };

  const onDateChange = (dates, dateStrings) => {
    // Handle date range selection if needed
    console.log('Selected dates: ', dates);
    console.log('Formatted date strings: ', dateStrings);
  };

  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Loại Tài Sản
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
        <Checkbox.Group options={options} defaultValue={['Option 1']} onChange={onChange} />
      </div>

      <div className='w-full mb-4'>
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
