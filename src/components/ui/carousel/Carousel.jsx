import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import './carousel.css';

const Carousel = ({ data = [], numberOfSilde = 1, component: Component }) => {
  return (
    <Swiper
      slidesPerView={numberOfSilde}
      navigation={true}
      modules={[Navigation]}
      className='w-full !h-full !p-0'
      spaceBetween={50}
    >
      {data.map((element) => (
        <SwiperSlide
          key={element.id}
          className='!h-full !flex object-cover justify-center items-center text-center text-xl bg-white'
        >
          <Component element={element} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
