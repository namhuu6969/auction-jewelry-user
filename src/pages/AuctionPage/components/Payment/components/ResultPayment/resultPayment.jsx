import { Divider, Result, Spin, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import TitleLabel from '../../../../../../components/ui/TitleLabel';
const { Title } = Typography;

export const ResultPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rspCode, setRspCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [money, setMoney] = useState('');
  const amount = searchParams.get('vnp_Amount');
  const bankCode = searchParams.get('vnp_BankCode');
  const bankNo = searchParams.get('vnp_BankTranNo');
  const cardType = searchParams.get('vnp_CardType');
  const orderInfo = searchParams.get('vnp_OrderInfo');
  const payDate = searchParams.get('vnp_PayDate');
  const responseCode = searchParams.get('vnp_ResponseCode');
  const tmnCode = searchParams.get('vnp_TmnCode');
  const transactionNo = searchParams.get('vnp_TransactionNo');
  const transactionStatus = searchParams.get('vnp_TransactionStatus');
  const txnRef = searchParams.get('vnp_TxnRef');
  const secureHash = searchParams.get('vnp_SecureHash');
  const generateVnpayUrl = (params) => {
    const baseUrl =
      'http://apijewelryauction.techx.id.vn:8081/api/v1/payment/vnpay/ipn';
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}?${queryString}`;
  };
  const params = {
    vnp_Amount: amount,
    vnp_BankCode: bankCode,
    vnp_BankTranNo: bankNo,
    vnp_CardType: cardType,
    vnp_OrderInfo: orderInfo,
    vnp_PayDate: payDate,
    vnp_ResponseCode: responseCode,
    vnp_TmnCode: tmnCode,
    vnp_TransactionNo: transactionNo,
    vnp_TransactionStatus: transactionStatus,
    vnp_TxnRef: txnRef,
    vnp_SecureHash: secureHash,
  };

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        setLoading(true);
        const url = generateVnpayUrl(params);
        const response = await axios.get(url);
        setRspCode(response.data.RspCode);
        setMessage(response.data.Message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentResult();
  }, []);

  useEffect(() => {
    const config = {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 9,
    };
    const formated = new Intl.NumberFormat('vi-VN', config).format(amount);
    setMoney(formated);
  }, []);
  return loading ? (
    <Spin />
  ) : rspCode === '00' ? (
    <div className='flex flex-col gap-10'>
      <Result
        status='success'
        title='Payment Success'
        subTitle={message}
        className='!p-0'
      />
      <div className='flex justify-center'>
        <div>
          <TitleLabel>Transaction No: {transactionNo || 'Unknom'}</TitleLabel>
        </div>
        <Divider type='vertical' />
        <div>
          <TitleLabel>Bank No: {bankNo || 'Unknom'}</TitleLabel>
        </div>
      </div>
      <Title level={4} className='font-sans'>
        Payment Detail
      </Title>
      <div className='grid grid-cols-4 border border-[#DDDDDD] px-5 py-10'>
        <div>
          <TitleLabel>Amount:</TitleLabel>
          <TitleLabel>{money || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Card Type:</TitleLabel>
          <TitleLabel>{cardType || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Order Infomation:</TitleLabel>
          <TitleLabel>{orderInfo || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Pay Date:</TitleLabel>
          <TitleLabel>{payDate || 'Unknom'}</TitleLabel>
        </div>
      </div>
      <div>
        <PrimaryButton
          key={'goto'}
          onClick={() => navigate('/wishlist')}
          className={'!w-fit'}
        >
          Go to your management
        </PrimaryButton>
      </div>
    </div>
  ) : (
    <div className='flex flex-col gap-10'>
      <Result
        className='!p-0'
        status='error'
        title='Payment Failed!'
        subTitle={message}
      />
      <div className='flex justify-center'>
        <div>
          <TitleLabel>Transaction No: {transactionNo || 'Unknom'}</TitleLabel>
        </div>
        <Divider type='vertical' />
        <div>
          <TitleLabel>Bank No: {bankNo || 'Unknom'}</TitleLabel>
        </div>
      </div>
      <Title level={4} className='font-sans'>
        Payment Detail
      </Title>
      <div className='grid grid-cols-4 border border-[#DDDDDD] px-5 py-10'>
        <div>
          <TitleLabel>Amount:</TitleLabel>
          <TitleLabel>{money || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Card Type:</TitleLabel>
          <TitleLabel>{cardType || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Order Infomation:</TitleLabel>
          <TitleLabel>{orderInfo || 'Unknom'}</TitleLabel>
        </div>
        <div>
          <TitleLabel>Pay Date:</TitleLabel>
          <TitleLabel>{payDate || 'Unknom'}</TitleLabel>
        </div>
      </div>
      <div>
        <PrimaryButton
          key={'goto'}
          onClick={() => navigate('/wishlist')}
          className={'!w-fit'}
        >
          Go to your management
        </PrimaryButton>
      </div>
    </div>
  );
};
