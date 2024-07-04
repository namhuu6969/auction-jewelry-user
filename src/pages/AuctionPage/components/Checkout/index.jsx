import { Form, Divider, Modal, Spin, Result } from 'antd';
import { UserInformationItem } from './components/UserInformationItem';
import { ProductItem } from './components/ProductItem';
import { PrimaryButton } from '../../../../components/ui/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutApi } from '../../../../services/api/Payment/checkoutApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearDataAfterCheckout } from '../../../../core/store/Checkout/checkoutSlice';
const CheckoutPage = () => {
  const auctionCheckout = useSelector((state) => state.checkout.auctionData);
  const authorization = localStorage.getItem('fullName');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const combinedAddress = `${values.numberAddress}, ${values.ward.label} , ${values.district.label} , Ho Chi Minh City, VN`;
      const data = {
        address: combinedAddress,
        full_name: values.full_name,
        phone_number: values.phone_number,
        auction_id: auctionCheckout.id,
      };
      setLoading(true);
      await checkoutApi.checkoutPaymentAuction(data);
    } catch (error) {
      setStatus(true);
    } finally {
      setOpen(true);
      setLoading(false);
    }
  };

  return authorization ? (
    <div>
      {Object.keys(auctionCheckout).length !== 0 ? (
        <>
          <Form form={form} labelCol={{ span: 24 }} onFinish={onFinish}>
            <UserInformationItem form={form} />
            <Divider />
            <ProductItem />
            <Divider />
            <Form.Item className='flex w-full justify-end'>
              <PrimaryButton
                loading={loading}
                htmlType='submit'
                className={'!text-xl !py-1 !px-5'}
              >
                Payment
              </PrimaryButton>
            </Form.Item>
          </Form>
          <ModalResult
            open={open}
            setOpen={setOpen}
            loading={loading}
            status={status}
          />
        </>
      ) : (
        <>
          <Result
            status={'warning'}
            title='Not find auction'
            subTitle='Please return to your management!'
          />
          <PrimaryButton onClick={() => navigate('/wishlist')}>
            Back to manage
          </PrimaryButton>
        </>
      )}
    </div>
  ) : (
    <>
      <Result
        status={'warning'}
        title='Not Authorize'
        subTitle='You are not authorize! Please login'
      />
      <PrimaryButton onClick={() => navigate('/login')}>
        Back to login
      </PrimaryButton>
    </>
  );
};

const ModalResult = ({ open, setOpen, loading, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(clearDataAfterCheckout());
    setOpen(false);
    navigate('/');
  };
  return (
    <Modal open={open} onCancel={handleCloseModal} footer={false}>
      {loading ? (
        <Spin />
      ) : !status ? (
        <>
          <Result
            status={'success'}
            title={'Checkout Success'}
            subTitle={'Thanks for use Jewelry Auction Website! Bit more now'}
          />
          <div className='flex justify-end w-full'>
            <PrimaryButton key={'oke'} onClick={handleCloseModal}>
              Continue auction
            </PrimaryButton>
          </div>
        </>
      ) : (
        <>
          <Result
            status={'error'}
            title={'Checkout Error'}
            subTitle={'Sorry! Please check information and wallet clearly'}
          />
          <div className='flex justify-end w-full'>
            <PrimaryButton key={'oke'} onClick={handleCloseModal}>
              Go to wallet
            </PrimaryButton>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CheckoutPage;
