import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Flex, Divider } from 'antd';
import Breadcum from '@components/ui/Breadcum';

export const ValuationPage = () => {
  const API_KEY = 'SP8ZXNW3CMPXXEVBO8N7690VBO8N7'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcumLink = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Valuation',
      link: '/valuation',
    },
  ];
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=VND&unit=toz`
        );

        const prices = response.data.metals;
        const goldPrice = prices.gold;
        const gold24K = goldPrice * 0.99;
        const gold18K = goldPrice * 0.75;
        const gold9999 = goldPrice * 1;
        const gold14K = goldPrice * 0.583;
        const gold12K = goldPrice * 0.5;
        const formattedData = [
          { material: 'Vàng 24K', price: gold24K },
          { material: 'Vàng 18K', price: gold18K },
          { material: 'Vàng 14K', price: gold14K },
          { material: 'Vàng 12K', price: gold12K },
          { material: 'Vàng 9999', price: gold9999 },
          { material: 'Bạc', price: prices.silver },
        ];

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const columns = [
    {
      title: 'Chất liệu',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Giá mỗi lượng (31,1034768g) (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text.toLocaleString('vi-VN')}</span>,
    },
  ];

  if (loading) {
    return <Spin size='large' className='container mx-auto' />;
  }

  return (
    <div className='container mx-auto'>
      <Flex className='flex-col'>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
      </Flex>
      <Flex>
        <Table
          className='table-auto bg-white shadow-md rounded border-collapse w-[50%] font-sans'
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey='material'
        />
        <Flex className='flex-col items-end'>
          <img
            src='https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/154048/Originals/vang.jpg'
            alt='Image'
            className='w-[80%]'
          />
        </Flex>
      </Flex>
    </div>
  );
};
