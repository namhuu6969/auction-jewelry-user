import { Flex, Tabs, Typography, Image } from 'antd';
import './index.css';

const { Title, Paragraph } = Typography;

const TabsContent = ({ jewelry, startTime, endTime }) => {
  const items = [
    {
      key: 1,
      label: <p className='!font-medium text-black text-lg'>Description</p>,
      children: (
        <div>
          <Paragraph className='text-lg'>{jewelry.description}</Paragraph>
        </div>
      ),
    },
    {
      key: 2,
      label: <p className='!font-medium text-black text-lg'>Information</p>,
      children: (
        <div className='information'>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Starting Time:</p>
            <p className='text-lg'>{new Date(startTime).toLocaleString()}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Ending Time:</p>
            <p className='text-lg'>{new Date(endTime).toLocaleString()}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Category:</p>
            <p className='text-lg'>{jewelry.category.name}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Weight:</p>
            <p className='text-lg'>{jewelry.weight} grams</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Size:</p>
            <p className='text-lg'>{jewelry.size}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Color:</p>
            <p className='text-lg'>{jewelry.color}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Sex:</p>
            <p className='text-lg'>{jewelry.sex}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Brand:</p>
            <p className='text-lg'>{jewelry.brand.name || ''}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Condition:</p>
            <p className='text-lg'>{jewelry.jewelryCondition}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Status:</p>
            <p className='text-lg'>{jewelry.status}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Collection:</p>
            <p className='text-lg'>{jewelry.collection ? jewelry.collection.name : ''}</p>
          </Flex>
          <Flex className='justify-start items-center'>
            <p className='text-lg mr-2'>Materials:</p>
            <Flex className='!w-[300px]' justify='space-between'>
              {jewelry.jewelryMaterials.map((material, index) => (
                <p key={index} className='text-lg'>
                  {`${material.material.name} - ${material.weight} grams`}
                </p>
              ))}
            </Flex>
          </Flex>
        </div>
      ),
    },
    {
      key: 3,
      label: <p className='!font-medium text-black text-lg'>History</p>,
      children: <p className='text-lg'>History content here</p>,
    },
  ];

  return (
    <div className='w-full mt-5'>
      <Flex className='w-full justify-between'>
        <Title level={2} className='!font-serif !font-medium'>
          Jewelry Description
        </Title>
      </Flex>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
};

export default TabsContent;
