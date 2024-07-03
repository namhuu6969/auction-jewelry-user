import { useNavigate } from 'react-router-dom';
import { Modal, Button, Input, Steps, Typography, Flex, Card } from 'antd';
import { IoRemove, IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { UserServices } from '../../../../../../../services/api/UserServices/UserServices';
import { useSelector } from 'react-redux';

const { Step } = Steps;
const { Title } = Typography;

export const BidModal = ({
  open,
  currentStep,
  step,
  currentPrice,
  bidAmount,
  handleOk,
  handleCancel,
  handleBidAmountChange,
  handleBlur,
  increaseBidAmount,
  decreaseBidAmount,
  next,
  prev,
}) => {
  const userData = useSelector((state) => state.personal.user);
  const money = useSelector((state) => state.personal.money);

  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await UserServices.getProfile();
      setProfileInfo(response.data);
    };
    fetchUserData();
  }, []);

  const steps = [
    {
      title: 'Enter Bid Amount',
      content: (
        <div className='flex flex-col gap-4'>
          <label>Bid Amount (VND):</label>
          <Flex justify='center' align='center'>
            <Button
              disabled={parseInt(bidAmount) <= parseInt(currentPrice + step)}
              className='!inline w-[10%]'
              onClick={decreaseBidAmount}
              type='primary'
            >
              <IoRemove />
            </Button>
            <Input
              className='w-[80%]'
              min='0'
              step={step}
              value={bidAmount}
              onChange={handleBidAmountChange}
              onBlur={handleBlur} // Pass handleBlur function here
              placeholder={`Enter your bid amount (multiple of ${step})`}
            />
            <Button className='!inline w-[10%]' onClick={increaseBidAmount} type='primary'>
              <IoAdd />
            </Button>
          </Flex>
          <div>
            {bidAmount % step !== 0 && ( // Display error message if bidAmount is not a multiple of step
              <p style={{ color: 'red' }}>Bid amount must be a multiple of {step}</p>
            )}
          </div>
          <Card title={profileInfo.full_name} extra={<a href='#'>More</a>}>
            <p>Your Wallet Balance: {profileInfo.money} VND</p> {/* Display wallet balance */}
          </Card>
        </div>
      ),
    },
    {
      title: 'Confirm Bid',
      content: (
        <div className='flex flex-col gap-4'>
          <Title level={4}>Please confirm your bid:</Title>
          <p>Bid Amount: {bidAmount} VND</p>
          <p>Your Wallet Balance: {profileInfo.money} VND</p> {/* Display wallet balance */}
        </div>
      ),
    },
  ];

  const navigator = useNavigate();

  const checkWallet = () => {
    if (profileInfo.money < bidAmount) {
      Modal.confirm({
        title: 'Insufficient Funds',
        content: `Your wallet balance is not sufficient`,
        okText: 'Go to Payment',
        cancelText: 'Cancel',
        onOk: () => {
          navigator('/payment');
        },
      });
    } else {
      handleOk();
    }
  };

  return (
    <Modal
      title='Place a Bid'
      open={open}
      onOk={checkWallet}
      onCancel={handleCancel}
      footer={[
        currentStep > 0 && (
          <Button key='back' onClick={prev}>
            Previous
          </Button>
        ),
        currentStep < steps.length - 1 ? (
          <Button
            disabled={!bidAmount || bidAmount % step !== 0}
            key='next'
            type='primary'
            onClick={next}
          >
            Next
          </Button>
        ) : (
          <Button key='submit' type='primary' onClick={checkWallet}>
            Submit
          </Button>
        ),
      ]}
    >
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className='steps-content'>{steps[currentStep].content}</div>
    </Modal>
  );
};
