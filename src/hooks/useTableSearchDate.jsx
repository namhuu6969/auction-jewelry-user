import { useState, useRef } from 'react';
import { Button, Space, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const useTableSearchDate = () => {
  const [searchDate, setSearchDate] = useState(null);
  const [searchedDateColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchDate(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchDate(null);
  };

  const getColumnSearchDateProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <DatePicker
          format={'DD/MM/YYYY'}
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || null}
          onChange={(date) => setSelectedKeys(date ? [date] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordDate = new Date(record[dataIndex]);
      const filterDate = new Date(value);
      return (
        recordDate.getDate() === filterDate.getDate() &&
        recordDate.getMonth() === filterDate.getMonth() &&
        recordDate.getFullYear() === filterDate.getFullYear()
      );
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.focus(), 100);
      }
    },
    render: (data) =>
      data
        ? new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(data))
        : '',
  });

  return {
    searchDate,
    searchedDateColumn,
    getColumnSearchDateProps,
  };
};

export default useTableSearchDate;
