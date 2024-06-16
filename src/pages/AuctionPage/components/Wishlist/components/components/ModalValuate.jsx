import { Form, Modal, Switch, Typography } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { useState } from 'react';
import { myValuatingApi } from '../../../../../../services/api/WishlistApi/myValuatingApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../../../../../../hooks/useNotification';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';

const { Title } = Typography;

export const ModalValuate = ({ setOpen, open }) => {
  const [form] = Form.useForm();
  const [online, setOnline] = useState(false);
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const [loading, setLoading] = useState(false);
  const { openNotification, contextHolder } = useNotification();
  const dispatch = useDispatch();
  const handleChangeOnline = (checked) => {
    setOnline(checked);
  };

  const onFinish = async (values) => {
    const { online } = values;
    const data = {
      online: online,
      jewelryId: jewelryId,
      desiredPrice: 0,
      paymentMethod: 'VNPAY',
      notes: 'string',
      valuatingMethod: 'DIRECTLY_VALUATION',
    };
    try {
      setLoading(true);
      await myValuatingApi.valuateTheJewelry(data);
      openNotification({
        type: 'success',
        description: 'Định giá sản phẩm thành công',
      });
      dispatch(setRender(true));
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={'Định giá sản phẩm'}
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={[
          <SecondaryButton
            onClick={handleClose}
            className={'text-md px-5'}
            key='cancel'
          >
            Hủy
          </SecondaryButton>,
          <PrimaryButton
            onClick={handleSubmit}
            className={'text-md px-5'}
            key='save'
            type='primary'
            loading={loading}
          >
            Gửi định giá
          </PrimaryButton>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 24,
          }}
        >
          <Title level={5} className='font-sans !font-medium'>
            Bạn muốn định giá sản phẩm online không?
          </Title>
          <div className='flex gap-2 !items-center'>
            <Title
              level={5}
              className={`font-sans mt-2 !font-medium !w-fit ${
                !online ? '!text-[#946257]' : ''
              }`}
            >
              Không
            </Title>
            <Form.Item name='online' valuePropName='checked' noStyle>
              <Switch
                checked={online}
                onChange={handleChangeOnline}
                className={`${online ? '!bg-[#946257]' : ''}`}
              />
            </Form.Item>
            <Title
              level={5}
              className={`font-sans mt-2 !font-medium !w-fit ${
                online ? '!text-[#946257]' : ''
              }`}
            >
              Có
            </Title>
          </div>
        </Form>
      </Modal>
    </>
  );
};
