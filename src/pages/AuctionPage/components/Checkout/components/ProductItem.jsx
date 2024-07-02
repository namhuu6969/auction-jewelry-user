import { Image, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDateToYMDHM, formatPriceVND, imageURL } from '../../../../../utils/utils';
const { Title } = Typography;
export const ProductItem = () => {
  const auctionCheckout = useSelector((state) => state.checkout.auctionData);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: 'Image',
      dataIndex: ['jewelry', 'thumbnail'],
      key: 'image',
      render: (data) => <Image width={150} height={150} src={imageURL(data)} />,
    },
    {
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startTime',
      key: 'startDate',
      render: (data) =>formatDateToYMDHM(data)
    },
    {
      title: 'End Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (data) => formatPriceVND(data)
    },
  ];
  useEffect(() => {
    if (auctionCheckout) {
      setDataSource([auctionCheckout]);
    }
  }, [auctionCheckout]);
  return (
    <div>
      <Typography.Title level={3} className='!font-sans !font-normal text-left'>
        Your winning jewelry
      </Typography.Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div className='flex mt-6 w-full'>
        <Title level={4} className='font-sans !font-normal'>
          Total Price: {formatPriceVND(dataSource[0]?.currentPrice)}
        </Title>
      </div>
    </div>
  );
};
