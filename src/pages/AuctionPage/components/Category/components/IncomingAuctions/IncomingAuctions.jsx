import { Flex } from 'antd';
import { Typography } from 'antd';
import MiniCard from './components/MiniCard/MiniCard';

const { Title } = Typography;

export const IncomingAuctions = ({ data }) => {
  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Trạng Thái Tài Sản
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>
      <Flex vertical>
        {data.map((item, index) => {
          if (index < 3) {
            return (
              <MiniCard
                key={item.name}
                imageSrc={item.imageUrl}
                title={item.name}
                price={item.startingPrice}
              />
            );
          }
        })}
      </Flex>
    </div>
  );
};
