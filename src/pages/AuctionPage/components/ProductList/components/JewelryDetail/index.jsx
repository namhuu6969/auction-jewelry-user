import { Avatar, Button, Divider, Flex, Image, Modal, Typography } from 'antd';
import Breadcum from '@components/ui/Breadcum';
import { useParams } from 'react-router-dom';
import Carousel from '@components/ui/carousel/Carousel';
import {
  StarFilled,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import TabsContent from './Tabs/Tabs';
import './index.css';
import { useState, useEffect } from 'react';
import { PrimaryButton } from '@components/ui/PrimaryButton';
import { BidModal } from './BidModal/BidModal'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { auctionApi } from '@api/AuctionServices/AuctionApi/AuctionApi';
import { BiddingApi } from '@api/AuctionServices/BiddingApi/BiddingApi';

const { Title } = Typography;

export const JewelryDetail = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState(null);
  const [jewelryData, setJewelryData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchAuctionData = async () => {
      const response = await auctionApi.getAuctionById(id);
      setJewelryData(response.data.jewelry);
      setAuctionData(response.data);
      setStep(response.data.step);
      setSelectedImage({
        id: 1,
        image: `http://167.71.212.203:8080/uploads/jewelry/${response.data.jewelry.jewelryImages[0]?.url}`, // Set the initial selected image
      });
    };
    fetchAuctionData();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const validBidAmount = Math.floor(bidAmount / step) * step;
    const dataBidding = { auctionId: id, bidAmount: validBidAmount };
    setIsModalVisible(false);
    const response = await BiddingApi.createBid(dataBidding);
    if (response.code === 200) {
      Modal.success({
        title: 'Bid Successfully',
        content: 'Your bid is on its way!',
        okText: 'Bid more now',
        cancelText: 'Cancel',
        onOk: () => {
          navigator('/auction');
        },
      });
      setCurrentStep(0);
      setBidAmount(''); // Reset bid amount after successful bid
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
  };

  const increaseBidAmount = () => {
    setBidAmount((prevBidAmount) =>
      (parseInt(prevBidAmount) + step).toString()
    );
  };

  const decreaseBidAmount = () => {
    setBidAmount((prevBidAmount) => {
      const newBidAmount = parseInt(prevBidAmount) - step;
      return newBidAmount >= 0 ? newBidAmount.toString() : '0';
    });
  };

  const handleBidAmountChange = (e) => {
    const value = e.target.value;
    setBidAmount(value);
  };

  const handleBlur = () => {
    const validBidAmount = Math.floor(bidAmount / step) * step;
    setBidAmount(validBidAmount.toString());
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const formatedDateTime = (time) => {
    const dateFormat = new Date(time).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    return dateFormat;
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
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
      <Image
        className={`w-[60%] my-10 carousel-image cursor-pointer ${
          element.id === selectedImage?.id ? 'selected' : ''
        }`}
        src={element?.image}
        onClick={() => handleImageClick(element)}
        preview={false}
      />
    );
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  if (!jewelryData) {
    return <div>Loading...</div>;
  }

  const { name, jewelryImages, staringPrice, sellerId } = jewelryData;

  const { currentPrice, totalBids, endTime, startTime, status } = auctionData;

  return (
    <div className='container mx-auto'>
      <Flex vertical>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
        <Flex gap={10}>
          <Flex vertical className='w-[50%] justify-center'>
            <div>
              <Image
                className='w-[100%] mx-auto !object-cover cursor-pointer'
                src={selectedImage.image}
              />
            </div>
            {jewelryImages.length > 1 && (
              <Carousel
                component={img}
                data={jewelryImages.map((img) => ({
                  id: img.id,
                  image: `http://167.71.212.203:8080/uploads/jewelry/${img.url}`,
                }))}
                numberOfSilde={5}
              />
            )}
          </Flex>
          <Flex vertical className='w-[50%]' gap={20}>
            <Title level={2} className='font-serif !font-medium text-left'>
              {name}
            </Title>
            <Flex className='items-center w-full'>
              <div className='grid grid-cols-2 gap-y-5'>
                <Title
                  className='!mr-4 !my-auto text-left font-sans !font-medium'
                  level={4}
                >
                  Giá thầu hiện tại:
                </Title>
                <Title
                  className='!m-0 !my-auto !text-red-600 text-left font-sans'
                  level={3}
                >
                  {currentPrice} VND
                </Title>
                <Title
                  className='!m-0 !my-auto text-left font-sans !font-medium'
                  level={4}
                >
                  Bước nhảy:
                </Title>
                <Title
                  className='!m-0 !my-auto !text-red-600 text-left font-sans'
                  level={3}
                >
                  {step} VND
                </Title>
                <Title
                  className='!m-0 !my-auto text-left font-sans !font-medium'
                  level={4}
                >
                  Trạng thái:
                </Title>
                <Title
                  className='!m-0 !my-auto !text-red-600 text-left font-sans'
                  level={3}
                >
                  {status}
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
                  {totalBids}
                </Title>
              </Flex>
              <Flex className='items-center' gap={10}>
                <ClockCircleOutlined className='!text-3xl' />
                <Title level={4} className='!m-0 font-sans !font-thin'>
                  {calculateDaysDifference(startTime, endTime)} days
                </Title>
              </Flex>
              <Flex className='items-center' gap={10}>
                <Title
                  level={5}
                  className='bg-[#DED6D6] !m-0 px-2 font-sans !font-medium rounded-md'
                >
                  Session end at {formatedDateTime(endTime)}
                </Title>
              </Flex>
            </Flex>
            <PrimaryButton
              onClick={showModal}
              className={'!text-2xl font-medium'}
            >
              Đấu giá
            </PrimaryButton>
            {staringPrice > 0 && (
              <div className='w-full p-5'>
                <Button
                  icon={<StarFilled className='text-yellow-400' />}
                  className='font-sans !shadow-lg hover:!border-[1px] hover:!border-solid hover:!border-black hover:!text-black !border-black'
                >
                  Buy Now
                </Button>
              </div>
            )}
            <div className='flex mt-5 flex-col border border-gray-300 py-5 px-10 rounded-lg'>
              <Title level={3} className='text-left font-serif'>
                Seller
              </Title>
              <Flex gap={30}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Flex vertical className='justify-center'>
                  <Title level={4} className='font-sans !font-medium'>
                    {sellerId.full_name}
                  </Title>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>
        <TabsContent
          jewelry={jewelryData}
          startTime={startTime}
          endTime={endTime}
        />
      </Flex>
      <BidModal
        open={isModalVisible}
        currentStep={currentStep}
        step={step}
        bidAmount={bidAmount}
        handleOk={handleOk}
        userWallet={1000000000000000}
        handleCancel={handleCancel}
        handleBidAmountChange={handleBidAmountChange}
        handleBlur={handleBlur}
        increaseBidAmount={increaseBidAmount}
        decreaseBidAmount={decreaseBidAmount}
        next={next}
        prev={prev}
      />
    </div>
  );
};
