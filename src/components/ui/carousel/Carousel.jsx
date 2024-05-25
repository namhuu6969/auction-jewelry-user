import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import './carousel.css';
import CardContent from '@components/ui/Card';

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
          <CardContent element={element} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
