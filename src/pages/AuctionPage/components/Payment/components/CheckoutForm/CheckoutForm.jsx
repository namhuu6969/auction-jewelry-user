import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Form, Button, Input, notification } from 'antd';
import { CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

export const CheckoutForm = () => {
  const onFinish = async (values) => {
    console.log('Received values:', values);
    // Call your backend to create a payment intent
    // Pass the client secret to the payment form
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
        payment_method: {
          card: values.card,
          billing_details: {
            name: values.name,
            address: {
              line1: values.address,
              city: values.city,
              postal_code: values.postalCode,
              state: values.state,
              country: values.country,
            },
          },
        },
      });

      if (error) {
        notification.error({
          message: 'Payment failed',
          description: error.message,
        });
      } else {
        notification.success({
          message: 'Payment successful',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Payment failed',
        description: 'An error occurred while processing your payment. Please try again later.',
      });
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <Form name='payment-form' onFinish={onFinish}>
        <Form.Item
          name='name'
          label='Name on Card'
          rules={[{ required: true, message: 'Please enter the name on your card' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='card'
          label='Card Details'
          rules={[{ required: true, message: 'Please enter your card details' }]}
        >
          <CardElement />
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='city'
          label='City'
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='postalCode'
          label='Postal Code'
          rules={[{ required: true, message: 'Please enter your postal code' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='state'
          label='State'
          rules={[{ required: true, message: 'Please enter your state' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='country'
          label='Country'
          rules={[{ required: true, message: 'Please enter your country' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className='text-end'>
          <Button type='primary' htmlType='submit'>
            Pay
          </Button>
        </Form.Item>
      </Form>
    </Elements>
  );
};
