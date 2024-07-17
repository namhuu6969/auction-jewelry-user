import { Button, Divider, Flex, Image, Modal, Typography, notification } from 'antd';
import Breadcum from '@components/ui/Breadcum';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from '@components/ui/carousel/Carousel';
import { StarFilled, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PiGavelFill } from 'react-icons/pi';
import './index.css';
import { useState, useEffect } from 'react';
import { PrimaryButton } from '@components/ui/PrimaryButton';
import { auctionApi } from '@api/AuctionServices/AuctionApi/AuctionApi';
import { BiddingApi } from '@api/AuctionServices/BiddingApi/BiddingApi';
import { wishlistApi } from '../../../../../../services/api/WishlistApi/wishlistApi';
import { formatPriceVND, handleStatus } from '../../../../../../utils/utils';
import useSWR from 'swr';
import { CountdownTimer } from './components/CountdownTimer/CountdownTimer';
import { BidHistory } from './components/BidHistory/BidHistory';
import TabsContent from './components/Tabs/Tabs';
import { BidModal } from './components/BidModal/BidModal';
import { SellerCard } from './components/SellerCard/SellerCard';
const { Title } = Typography;

const fetcher = async (id) => {
  const response = await auctionApi.getAuctionById(id);
  return response.data;
};

export const JewelryDetail = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading, mutate } = useSWR(id, fetcher, { refreshInterval: 3000 });
  const [auctionData, setAuctionData] = useState(null);
  const [jewelryData, setJewelryData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState(0);
  const [isWinner, setIsWinner] = useState(false); // State to check if user is winner
  const [bidAmount, setBidAmount] = useState('');
  const [people, setPeople] = useState(0);

  const userEmail = localStorage.getItem('fullName');

  console.log(data);
  const fetcherPeople = async (id) => {
    const response = await auctionApi.getPeopleByAuctionId(id);
    console.log('people: ');
    setPeople(response.message.split(' ')[2]);
  };

  useEffect(() => {
    if (data) {
      fetcherPeople(id);
      setJewelryData(data.jewelry);
      setAuctionData(data);
      setStep(data.step);
      setBidAmount((data.currentPrice + data.step).toString());
      setSelectedImage({
        id: 1,
        image: `http://167.71.212.203:8080/uploads/jewelry/${data.jewelry.jewelryImages[0]?.url}`, // Set the initial selected image
      });
      if (data.winner) setIsWinner(data.winner);
    }
  }, [data]);

  const showModal = () => {
    if (!userEmail) {
      Modal.confirm({
        title: 'You are not logged in',
        content: 'Do you want to login now?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          navigator('/login', { state: { from: `/jewelry/detail/${id}` } });
        },
        onCancel: () => {
          // Handle cancel action if needed
          setIsModalVisible(false);
          return;
        },
      });
    }
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
        okText: 'Ok',
        cancelText: 'Cancel',
        onOk: () => {
          setIsModalVisible(false);
        },
      });
      setCurrentStep(0);
      setBidAmount(''); // Reset bid amount after successful bid
      mutate();
    } else {
      Modal.error({
        title: 'Bid Failed',
        content: response.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
  };

  const increaseBidAmount = () => {
    setBidAmount((prevBidAmount) => (parseInt(prevBidAmount) + step).toString());
  };

  const decreaseBidAmount = () => {
    if (bidAmount > currentPrice) {
      setBidAmount((prevBidAmount) => (parseInt(prevBidAmount) - step).toString());
    } else {
      notification.warning({
        message: 'Bid amount must be greater than current price',
      });
    }
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
    return dateFormat.split(' ')[1];
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
        className={`!w-[100%] my-10 carousel-image cursor-pointer ${
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

  const handleAddToWishList = async (auctionId) => {
    try {
      const response = await wishlistApi.getWishlist();
      const alreadyHasWishList = response.data.some((item) => item.auction.id == auctionId);
      if (alreadyHasWishList) {
        notification.warning({
          message: 'Already in wishlist',
        });
        return;
      } else {
        await wishlistApi.addWishList(auctionId);
        if (response.code === 200) {
          notification.success({
            message: 'Success',
            description: 'Add to wishlist successfully',
          });
        }
      }
      // await wishlistApi.addWishList(auctionId);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
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
          <Flex vertical className='w-[50%]'>
            {isWinner && (
              <div className='overlay-winner'>
                {isWinner.email === userEmail ? (
                  <div>
                    <p>You are winner right now</p>
                  </div>
                ) : (
                  <div>
                    <p>{`${isWinner.full_name} are winner right now`}</p>
                  </div>
                )}
              </div>
            )}
            <div className='overlay'>
              <Image
                className='!w-[100%] mx-auto !object-cover cursor-pointer'
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
              <div className='w-[80%] grid grid-cols-2 gap-y-5'>
                <Title className='!mr-4 !my-auto text-left font-sans !font-medium' level={3}>
                  Current Price:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  {formatPriceVND(currentPrice)}
                </Title>
                <Title className='!mr-4 !my-auto text-left font-sans !font-medium' level={3}>
                  Start Date:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  {formatedDateTime(startTime)}
                </Title>
                <Title className='!mr-4 !my-auto text-left font-sans !font-medium' level={3}>
                  Eding Date:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  {formatedDateTime(endTime)}
                </Title>
                <Title className='!m-0 !my-auto text-left font-sans !font-medium' level={3}>
                  Step:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  {formatPriceVND(step)}
                </Title>
                <Title className='!m-0 !my-auto text-left font-sans !font-medium' level={3}>
                  Status:
                </Title>
                <Title className='!m-0 !my-auto !text-red-600 text-left font-sans' level={3}>
                  {handleStatus(status)}
                </Title>
              </div>
              <div className='w-[10%] p-5'>
                <Button
                  onClick={() => handleAddToWishList(id)}
                  icon={<StarFilled className='text-yellow-400' />}
                  className='font-sans !shadow-lg hover:!border-[1px] hover:!border-solid hover:!border-black hover:!text-black !border-black'
                >
                  Add Watch/Wishlist
                </Button>
              </div>
            </Flex>
            <CountdownTimer targetDate={endTime} />
            <Flex gap={15}>
              <Flex className='items-center' gap={18}>
                <PiGavelFill className='!text-3xl' />
                <BidHistory auctionId={id} />
              </Flex>
              <Flex className='items-center' gap={18}>
                <UserOutlined className='!text-3xl' />
                <Title level={4} className='!m-0 font-sans !font-thin text-start'>
                  People: {people}
                </Title>
              </Flex>
              <Flex className='items-center' gap={18}>
                <ClockCircleOutlined className='!text-3xl' />
                <Title level={4} className='!m-0 font-sans !font-thin text-start'>
                  Auction Duration: {calculateDaysDifference(startTime, endTime)} days
                </Title>
              </Flex>
            </Flex>
            {userEmail !== sellerId.email &&
              (isWinner.email === userEmail ? (
                <PrimaryButton
                  disabled={status !== 'InProgress' ? true : false}
                  onClick={showModal}
                  className={'!text-2xl font-medium'}
                >
                  Auto Bid
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  disabled={status !== 'InProgress' ? true : false}
                  onClick={showModal}
                  className={'!text-2xl font-medium'}
                >
                  Place Bid
                </PrimaryButton>
              ))}
            <SellerCard sellerId={sellerId} />
          </Flex>
        </Flex>
        <TabsContent jewelry={jewelryData} startTime={startTime} endTime={endTime} />
      </Flex>
      {userEmail && (
        <BidModal
          open={isModalVisible}
          currentStep={currentStep}
          currentPrice={currentPrice}
          step={step}
          bidAmount={bidAmount}
          handleOk={handleOk}
          handleCancel={handleCancel}
          handleBidAmountChange={handleBidAmountChange}
          handleBlur={handleBlur}
          increaseBidAmount={increaseBidAmount}
          decreaseBidAmount={decreaseBidAmount}
          next={next}
          prev={prev}
        />
      )}
    </div>
  );
};
