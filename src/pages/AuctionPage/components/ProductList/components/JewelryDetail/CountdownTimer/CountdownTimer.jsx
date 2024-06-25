import { Card, Flex, Typography } from 'antd';
import { useState, useEffect } from 'react';

const { Title } = Typography;

export const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [targetDate]);

  return (
    <Card
      title={
        <Title level={4} className='font-sans'>
          Time Remaining
        </Title>
      }
      hoverable
      style={{ width: '100%', textAlign: 'center' }}
    >
      <Title className='font-sans' level={3}>
        {formatTimeRemaining(timeRemaining)}
      </Title>
    </Card>
  );
};

const calculateTimeRemaining = (targetDate) => {
  const now = new Date();
  const difference = new Date(targetDate) - now;
  return difference > 0 ? difference : 0;
};

const formatTimeRemaining = (time) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return (
    <Flex justify='space-around'>
      <div>
        <Title className='font-sans' level={3}>
          {days}
        </Title>
        <Title className='!mt-0 font-sans' level={3}>
          days
        </Title>
      </div>
      <div>
        <Title className='font-sans' level={3}>
          {hours.toString().padStart(2, '0')}
        </Title>
        <Title className='!mt-0 font-sans' level={3}>
          hours
        </Title>
      </div>
      <div>
        <Title className='font-sans' level={3}>
          {minutes.toString().padStart(2, '0')}
        </Title>
        <Title className='!mt-0 font-sans' level={3}>
          minutes
        </Title>
      </div>
      <div>
        <Title className='font-sans' level={3}>
          {seconds.toString().padStart(2, '0')}
        </Title>
        <Title className='!mt-0 font-sans' level={3}>
          seconds
        </Title>
      </div>
    </Flex>
  );
};

// `${days} days ${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes ${seconds.toString().padStart(2, '0')} seconds`;
