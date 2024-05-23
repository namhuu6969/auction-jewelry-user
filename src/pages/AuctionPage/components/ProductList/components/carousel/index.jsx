import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Button, Card, Flex, Typography } from 'antd';
import './carousel.css';

const { Title } = Typography;

const Carousel = ({ data = [], numberOfSilde = 1, category, status }) => {
  const filteredData = data.filter((item) => {
    if (category && status) {
      return item.category === category && item.status === status;
    } else if (category) {
      return item.category === category;
    } else if (status) {
      return item.status === status;
    }
    return true;
  });

  return (
    <Swiper
      slidesPerView={numberOfSilde}
      navigation={true}
      modules={[Navigation]}
      className='w-full !h-full !p-0'
      spaceBetween={50}
    >
      {filteredData.map((element) => (
        <SwiperSlide
          key={element.id}
          className='!h-full !flex object-cover justify-center items-center text-center text-xl bg-white'
        >
          <Card
            cover={
              <img
                alt={element.name}
                src={element.imageUrl}
                className='w-full object-cover'
              />
            }
            bordered={false}
            bodyStyle={{ padding: 0 }}
            className='!w-full !h-full'
          >
            <Flex className='!min-h-full bg-[#F2E7E7] px-5 py-4' vertical>
              <Flex className='!min-h-16'>
                <Title
                  className='multi-line-ellipsis !flex-1 text-left font-serif'
                  level={4}
                >
                  {element.name}
                </Title>
              </Flex>
              <Flex gap={10}>
                <Title
                  level={5}
                  className='!flex-1 !text-[#898989] !font-medium text-left font-sans'
                >
                  The current:
                </Title>
                <Title
                  level={5}
                  className='!flex-1 !mt-0 !text-right font-sans !font-medium !text-[#946257]'
                >
                  {element.startingPrice} VND
                </Title>
              </Flex>
              <Flex className='!flex-1 justify-between items-center !h-full'>
                <Title
                  level={5}
                  className='!m-0 font-sans !font-medium text-left !text-[#FF0000]'
                >
                  {element.status.toUpperCase()}
                </Title>
                <Button className='px-8 !border-black font-semibold !text-black hover:!bg-[#946257] hover:!text-[#fff] font-serif shadow-md'>
                  BID
                </Button>
              </Flex>
            </Flex>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
