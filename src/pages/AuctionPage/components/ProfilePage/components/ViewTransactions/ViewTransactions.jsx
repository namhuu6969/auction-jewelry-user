// src/ViewTransactions.js
import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import moment from 'moment';
import { transactionServices } from '../../../../../../services/api/TransactionServices/transactionServices';

export const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionServices.getUserTransactions();
        setTransactions(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        message.error('Failed to load transactions.');
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Amount',
      dataIndex: 'money',
      key: 'money',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Sender',
      key: 'sender',
      dataIndex: 'systemSend',
      render: (systemSend, record) =>
        systemSend ? 'System' : record.sender?.full_name,
    },
    {
      title: 'Receiver',
      key: 'receiver',
      dataIndex: 'systemReceive',
      render: (systemReceive, record) =>
        systemReceive ? 'System' : record.receiver?.full_name,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      loading={loading}
      rowKey='id'
    />
  );
};
