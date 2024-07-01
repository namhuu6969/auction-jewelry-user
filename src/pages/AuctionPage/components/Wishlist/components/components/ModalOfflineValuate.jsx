import { Divider, Form, Input, Modal, Radio, Space } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { myValuatingApi } from '../../../../../../services/api/WishlistApi/myValuatingApi';
import { useNotification } from '../../../../../../hooks/useNotification';
import { useDispatch, useSelector } from 'react-redux';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { useState } from 'react';
import TitleLabel from '../../../../../../components/ui/TitleLabel';

export const ModalOfflineValuate = ({ open, setOpen }) => {
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  console.log(jewelryId);
  const [form] = Form.useForm();
  const { openNotification, contextHolder } = useNotification();
  const [method, setMethod] = useState('');
  const [isAtHome, setIsAtHome] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    setMethod('');
    setIsAtHome(false);
    setOpen(false);
  };
  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = async (values) => {
    const combinedAddress = `${values.numberAddress}, ${values.ward} Ward, ${values.district} District, ${values.city} City, ${values.nation}`;
    const data = {
      jewelryId: jewelryId,
      desiredPrice: 0,
      paymentMethod: 'VNPAY',
      notes: 'string',
      valuatingMethod: values.valuatingMethod,
      address: combinedAddress || 'string',
      online: false,
    };
    try {
      setLoading(true);
      await myValuatingApi.valuateTheJewelry(data);
      openNotification({
        type: 'success',
        description: 'Your request is send',
      });
      dispatch(setRender(true));
      setMethod('');
      setIsAtHome(false);
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Failed to fetch',
      });
    } finally {
      setLoading(false);
      handleCancel();
    }
  };

  const onChangeMethod = (e) => {
    setMethod(e.target.value);
    if (e.target.value === 'AT_HOME_VALUATION') {
      setIsAtHome(true);
    } else {
      setIsAtHome(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={'Offline Valuate'}
      footer={[
        <SecondaryButton onClick={handleCancel} key={'cancel'}>
          Cancel
        </SecondaryButton>,
        <PrimaryButton loading={loading} key={'submit'} onClick={handleSubmit}>
          Submit
        </PrimaryButton>,
      ]}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{
          span: 24,
        }}
      >
        <Form.Item
          name={'valuatingMethod'}
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          label={<TitleLabel>Choose method for valuate</TitleLabel>}
        >
          <Radio.Group value={method} onChange={onChangeMethod}>
            <Space direction='vertical'>
              <Radio value={'DIRECTLY_VALUATION'}>
                <TitleLabel className={'!font-semibold'}>
                  Valuate at our company (Address: FPT University )
                </TitleLabel>
              </Radio>
              <Radio value={'AT_HOME_VALUATION'}>
                <TitleLabel className={'!font-semibold'}>
                  Valuate at home
                </TitleLabel>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {isAtHome === true && (
          <div>
            <TitleLabel level={5} className={'!font-semibold'}>Enter your address <span className='!font-normal'>(Staff will valuate at your home)</span></TitleLabel>
            <Divider />
            <Form.Item
              rules={[{ required: true, message: 'Must not be empty!' }]}
              name={'numberAddress'}
              label={<TitleLabel>Number address</TitleLabel>}
              className='col-span-2'
            >
              <Input placeholder='Enter your number address' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Must not be empty!' }]}
              name={'ward'}
              label={<TitleLabel>Ward</TitleLabel>}
            >
              <Input placeholder='Enter Ward' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Must not be empty!' }]}
              name={'district'}
              label={<TitleLabel>District</TitleLabel>}
            >
              <Input placeholder='Enter District' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Must not be empty!' }]}
              name={'city'}
              label={<TitleLabel>City</TitleLabel>}
            >
              <Input placeholder='Enter City' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Must not be empty!' }]}
              name={'nation'}
              label={<TitleLabel>Nation</TitleLabel>}
            >
              <Input placeholder='Enter Nation' />
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
};
