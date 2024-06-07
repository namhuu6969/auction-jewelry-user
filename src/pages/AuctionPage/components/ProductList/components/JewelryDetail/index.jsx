import { Avatar, Button, Divider, Flex, Modal, Typography } from 'antd';
import Breadcum from '@components/ui/Breadcum';
import { useParams } from 'react-router-dom';
import Carousel from '@components/ui/carousel/Carousel';
import { StarFilled, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import TabsContent from './Tabs/Tabs';
import './index.css';
import { useState } from 'react';
import { SecondaryButton } from '@components/ui/SecondaryButton';
import { PrimaryButton } from '@components/ui/PrimaryButton';
import { BidModal } from './BidModal/BidModal'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export const JewelryDetail = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState({
    id: 1,
    image: 'https://happyjewelers.com/cdn/shop/products/130-40289_1_1445x.jpg?v=1687387508',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bidAmount, setBidAmount] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle the final submission logic here
    console.log('Final bid amount:', bidAmount);
    setIsModalVisible(false);
    setCurrentStep(0); // Reset step after submission
    Modal.success({
      title: 'Bid Successfully',
      content: `Your bid is on its way!`,
      okText: 'Bid more now',
      cancelText: 'Cancel',
      onOk: () => {
        navigator('/auction');
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0); // Reset step on cancel
  };

  const increaseBidAmount = () => {
    setBidAmount((prevBidAmount) => {
      return parseInt(prevBidAmount) + 100;
    });
  };

  const handleBidAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setBidAmount(value);
    }
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const breadcumLink = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Jewelry',
      link: '/jewelry',
    },
    {
      name: 'Detail',
      link: `/jewelry/detail/${id}`,
    },
  ];

  const img = ({ element }) => {
    return (
      <img
        className={`w-[60%] my-10 carousel-image cursor-pointer ${
          element.id === selectedImage.id ? 'selected' : ''
        }`}
        src={element.image}
        onClick={() => handleImageClick(element)}
      />
    );
  };

  const data = [
    {
      id: 1,
      image: 'https://happyjewelers.com/cdn/shop/products/130-40289_1_1445x.jpg?v=1687387508',
    },
    {
      id: 2,
      image: 'https://c0.wallpaperflare.com/preview/984/867/753/jewellery-gold-wedding-indian.jpg',
    },
    {
      id: 3,
      image:
        'https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-taobao-jewelry-fresh-and-simple-gold-jewelry-poster-image_194638.jpg',
    },
    {
      id: 4,
      image: 'https://c0.wallpaperflare.com/preview/984/867/753/jewellery-gold-wedding-indian.jpg',
    },
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className='container mx-auto'>
      <Flex vertical>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
        <Flex gap={10}>
          <Flex vertical className='w-[50%] justify-center'>
            <div>
              <img
                className='w-[500px] mx-auto h-[500px] cursor-pointer'
                src={selectedImage.image}
              />
            </div>
            <Carousel component={img} data={data} numberOfSilde={5} />
          </Flex>
          <Flex vertical className='w-[50%]' gap={20}>
            <Title level={2} className='font-serif !font-medium text-left'>
              Jewel ring
            </Title>
            <Flex className='items-center w-full'>
              <div className='grid grid-cols-2 gap-y-5'>
                <Title className='!m-0 !my-auto text-left font-sans !font-medium' level={4}>
                  The current:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  1.000.000 VND
                </Title>
                <Title className='!m-0 !my-auto text-left font-sans !font-medium' level={4}>
                  Step:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  500.000 VND
                </Title>
              </div>
              <div className='w-[40%] p-5'>
                <Button
                  icon={<StarFilled className='text-yellow-400' />}
                  className='font-sans !shadow-lg hover:!border-[1px] hover:!border-solid hover:!border-black hover:!text-black !border-black'
                >
                  Watch/Wishlist
                </Button>
              </div>
            </Flex>
            <Flex gap={15}>
              <Flex className='items-center' gap={10}>
                <UserOutlined className='!text-3xl' />
                <Title level={4} className='!m-0 font-sans !font-thin'>
                  12
                </Title>
              </Flex>
              <Flex className='items-center' gap={10}>
                <ClockCircleOutlined className='!text-3xl' />
                <Title level={4} className='!m-0 font-sans !font-thin'>
                  3 days
                </Title>
              </Flex>
              <Flex className='items-center' gap={10}>
                <Title
                  level={5}
                  className='bg-[#DED6D6] !m-0 px-2 font-sans !font-medium rounded-md'
                >
                  Session end at 20/05/2024
                </Title>
              </Flex>
            </Flex>
            <PrimaryButton onClick={showModal} className={'!text-2xl font-medium'}>
              Đấu giá
            </PrimaryButton>
            <div className='flex items-center gap-5'>
              <SecondaryButton onClick={() => console.log('oke')}>Mua ngay</SecondaryButton>
              <Title level={4} className='!m-0 !text-red-600'>
                with 5.000.000VND
              </Title>
            </div>
            <div className='flex mt-5 flex-col border border-gray-300 py-5 px-10 rounded-lg'>
              <Title level={3} className='text-left font-serif'>
                Seller
              </Title>
              <Flex gap={30}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Flex vertical className='justify-center'>
                  <Title level={4} className='font-sans !font-medium'>
                    Nam
                  </Title>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>
        <TabsContent />
      </Flex>
      <BidModal
        isVisible={isModalVisible}
        currentStep={currentStep}
        bidAmount={bidAmount}
        handleOk={handleOk}
        userWallet={1000}
        handleCancel={handleCancel}
        handleBidAmountChange={handleBidAmountChange}
        increaseBidAmount={increaseBidAmount}
        next={next}
        prev={prev}
      />
    </div>
  );
};
