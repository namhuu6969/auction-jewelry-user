// src/ViewPaymentHistory.js
import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import moment from 'moment';
import { transactionServices } from '@api/TransactionServices/transactionServices';

export const ViewPaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await transactionServices.getPaymentHistory();
        console.log(response.data);
        setPaymentHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
        message.error('Failed to load payment history.');
        setLoading(false);
      }
    };
    fetchPaymentHistory();
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
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Bank Code',
      dataIndex: 'bankCode',
      key: 'bankCode',
    },
    {
      title: 'Card Type',
      dataIndex: 'cardType',
      key: 'cardType',
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return <Table columns={columns} dataSource={paymentHistory} loading={loading} rowKey='id' />;
};
