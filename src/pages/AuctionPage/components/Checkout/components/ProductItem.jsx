import { Table, Typography } from 'antd';
const { Title } = Typography;
export const ProductItem = () => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Price',
      dataIndex: 'endPrice',
      key: 'endPrice',
    },
  ];
  const dataSource = [
    {
      image: 'a',
      name: 'Jewelry',
      startDate: '14/09/2003',
      endPrice: 1000000,
    },
  ];
  return (
    <div>
      <Typography.Title level={3} className='!font-sans !font-normal text-left'>
        Your winning jewelry
      </Typography.Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div className='flex mt-6 w-full'>
        <Title level={4} className='font-sans !font-normal'>Total Price: 1000000 VND</Title>
      </div>
    </div>
  );
};
