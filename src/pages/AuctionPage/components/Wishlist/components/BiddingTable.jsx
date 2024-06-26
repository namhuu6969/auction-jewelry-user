import { Table } from 'antd';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { myBiddingApi } from '../../../../../services/api/WishlistApi/myBiddingApi';
import { formatDate, formatPriceVND } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';

export const BiddingTable = () => {
  const { getColumnSearchProps } = useTableSearch();
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await myBiddingApi.getBiddingMe();
      setData(response.data);
    };
    fetchData();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'jewelryName',
      key: 'jewelryName',
      ...getColumnSearchProps('jewelryName'),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchDateProps('startTime'),
      render: (data) => formatDate(data),
      sorter: (a, b) => a.startTime - b.startTime,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      ...getColumnSearchDateProps('endTime'),
      render: (data) => formatDate(data),
      sorter: (a, b) => a.endTime - b.endTime,
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      sorter: (a, b) => a.currentPrice - b.currentPrice,
      render: (data) => formatPriceVND(data)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};
