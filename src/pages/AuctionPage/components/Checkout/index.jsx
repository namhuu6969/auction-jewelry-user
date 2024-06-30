import { Form, Divider } from 'antd';
import { UserInformationItem } from './components/UserInformationItem';
import { ProductItem } from './components/ProductItem';
import { CreditForm } from './components/CreditForm';
const CheckoutPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Handle the form submission logic here
  };

  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <UserInformationItem />
        <Divider />
        <ProductItem />
        <Divider />
      </Form>
    </div>
  );
};

export default CheckoutPage;
