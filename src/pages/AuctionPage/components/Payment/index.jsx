import { Flex, Image } from 'antd';
import { CheckoutForm } from './components/CheckoutForm/CheckoutForm';

export const Payment = () => {
  return (
    <Flex justify='space-around'>
      <Flex className='p-20' justify='center' align='center'>
        <CheckoutForm />
        <Flex className='ml-20 !h-full'>
          <img
            src='images/img-homepage.jpg'
            alt='Image 1'
            className='w-[400px] !h-full object-cover'
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
