import { Flex, Tabs, Typography } from 'antd';
import './index.css';
const { TabPane } = Tabs;
const { Title } = Typography;

const TabsContent = () => {
  return (
    <Tabs defaultActiveKey='1' className='custom-tabs'>
      <TabPane tab='Auction Description' key={1}>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Seller:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium !text-red-600'>
            Huu Nam
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Start Time:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium !text-red-600'>
            20/05/2024
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            End time:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium !text-red-600'>
            23/05/2024
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Buy now pricing:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium !text-red-600'>
            5.000.000 VND
          </Title>
        </Flex>
      </TabPane>
      <TabPane tab='Jewelry Description' key={2}>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Name:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Description:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Category:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Material:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Color:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Brand:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
        <Flex className=''>
          <Title className='w-[10%] text-left font-sans !font-medium' level={5}>
            Condition:
          </Title>
          <Title level={5} className='!m-0 text-left font-sans !font-medium'>
            Meoo meoo
          </Title>
        </Flex>
      </TabPane>
    </Tabs>
  );
};

export default TabsContent;
