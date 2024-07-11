import useSWR from 'swr';
import { transactionApi } from '../../../../../services/api/WishlistApi/transactionApi';
import { Table } from 'antd';
import { useEffect } from 'react';
import { useNotification } from '../../../../../hooks/useNotification';
import { formatDateToYMDHM, formatPriceVND } from '../../../../../utils/utils';

const fetch = async () => {
  const response = await transactionApi.getTransactionUser();
  const sortedData = response.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  console.log(sortedData)
  return sortedData;
};

export const TransactionTable = () => {
  const { data, error, isLoading } = useSWR('my-transaction-data', fetch);
  const { openNotification, contextHolder } = useNotification();
  const column = [
    {
      title: 'Created Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (data) => formatDateToYMDHM(data)
    },
    {
      title: 'Money',
      key: 'money',
      dataIndex: 'money',
      render: (data) => formatPriceVND(data)
    },
    {
      title: 'Sender',
      key: 'sender',
      dataIndex: ['sender', 'full_name'],
    },
    {
      title: 'Receiver',
      key: 'receiver',
      dataIndex: ['receiver', 'full_name'],
    },
  ];
  useEffect(() => {
    if (error) {
      openNotification({
        type: 'error',
        description: 'Failed to fetch',
      });
    }
  }, []);
  return (
    <div>
      {contextHolder}
      <Table columns={column} dataSource={data} loading={isLoading} />
    </div>
  );
};
