import { Flex } from 'antd';
import { Typography } from 'antd';
import MiniCard from './components/MiniCard/MiniCard';

const { Title } = Typography;

export const IncomingAuctions = ({ data }) => {
  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Suggesst
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>
      <Flex gap={20} vertical>
        {data.map((item, index) => {
          if (index < 3) {
            return (
              <MiniCard
                key={item.id}
                imageSrc={item.jewelry.thumbnail}
                title={item.jewelry.name}
                price={item.jewelry.staringPrice}
              />
            );
          }
        })}
      </Flex>
    </div>
  );
};
