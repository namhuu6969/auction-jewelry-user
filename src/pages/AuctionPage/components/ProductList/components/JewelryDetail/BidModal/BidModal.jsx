import { Modal, Button, Input, Steps, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Step } = Steps;
const { Title } = Typography;

export const BidModal = ({
  isVisible,
  currentStep,
  bidAmount,
  userWallet, // Added userWallet prop
  handleOk,
  handleCancel,
  handleBidAmountChange,
  increaseBidAmount,
  next,
  prev,
}) => {
  const steps = [
    {
      title: 'Enter Bid Amount',
      content: (
        <div className='flex flex-col gap-4'>
          <label>Bid Amount (VND):</label>
          <Input
            type='number'
            min='0'
            value={bidAmount}
            onChange={handleBidAmountChange}
            placeholder='Enter your bid amount'
          />
          <Button onClick={increaseBidAmount} type='primary' disabled={!bidAmount}>
            Increase by 100
          </Button>
          <p>Your Wallet Balance: {userWallet} VND</p> {/* Display wallet balance */}
        </div>
      ),
    },
    {
      title: 'Confirm Bid',
      content: (
        <div className='flex flex-col gap-4'>
          <Title level={4}>Please confirm your bid:</Title>
          <p>Bid Amount: {bidAmount} VND</p>
          <p>Your Wallet Balance: {userWallet} VND</p> {/* Display wallet balance */}
        </div>
      ),
    },
  ];

  const navigator = useNavigate();

  const checkWallet = () => {
    if (userWallet < bidAmount) {
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
      visible={isVisible}
      onOk={checkWallet}
      onCancel={handleCancel}
      footer={[
        currentStep > 0 && (
          <Button key='back' onClick={prev}>
            Previous
          </Button>
        ),
        currentStep < steps.length - 1 ? (
          <Button disabled={!bidAmount} key='next' type='primary' onClick={next}>
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
