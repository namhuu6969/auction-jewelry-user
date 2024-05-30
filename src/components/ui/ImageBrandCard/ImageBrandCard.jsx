import { Typography } from 'antd';
const { Title } = Typography;

export const ImageBrandCard = ({ element }) => {
  return (
    <div className='relative w-full h-[34rem]'>
      <img src='images/img-homepage.jpg' alt='Image 1' className='w-full h-full object-cover' />
      <div className='absolute bottom-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded m-8'>
        <Title level={3} style={{ color: 'white' }}>
          Khám phá vẻ đẹp của trang sức
        </Title>
        <p>
          Tìm hiểu về sự tinh tế và vẻ đẹp độc đáo trong từng chi tiết của các mẫu trang sức mới
          nhất. Hãy để mỗi món trang sức trở thành một phần trong câu chuyện của bạn, thể hiện phong
          cách và đẳng cấp riêng biệt.
        </p>
      </div>
    </div>
  );
};
