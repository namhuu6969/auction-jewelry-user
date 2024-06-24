import { Image, Table } from 'antd';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { useEffect, useState } from 'react';
import { myBiddingApi } from '../../../../../services/api/WishlistApi/myBiddingApi';
import { formatDate, formatPrice, formatPriceVND } from '../../../../../utils/utils';
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
      title: 'Tên sản phẩm',
      dataIndex: 'jewelryName',
      key: 'jewelryName',
      ...getColumnSearchProps('jewelryName'),
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchDateProps('startTime'),
      render: (data) => formatDate(data),
      sorter: (a, b) => a.startTime - b.startTime,
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      ...getColumnSearchDateProps('endTime'),
      render: (data) => formatDate(data),
      sorter: (a, b) => a.endTime - b.endTime,
    },
    {
      title: 'Giá hiện tại',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      sorter: (a, b) => a.currentPrice - b.currentPrice,
      render: (data) => formatPriceVND(data)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};
