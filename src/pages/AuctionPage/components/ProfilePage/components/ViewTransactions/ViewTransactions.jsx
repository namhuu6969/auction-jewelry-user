// src/ViewTransactions.js
import React, { useEffect, useState } from 'react';
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
      render: (sender) => sender?.full_name,
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      render: (receiver) => receiver?.full_name,
    },
  ];

  return <Table columns={columns} dataSource={transactions} loading={loading} rowKey='id' />;
};
