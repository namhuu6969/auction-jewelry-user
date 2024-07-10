import { DatePicker, InputNumber, Modal } from 'antd';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { wishlistApi } from '../../../../../../services/api/WishlistApi/wishlistApi';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { useNotification } from '../../../../../../hooks/useNotification';
import TitleLabel from '../../../../../../components/ui/TitleLabel';
import { formatPriceVND } from '../../../../../../utils/utils';
const { RangePicker } = DatePicker;

export const ModalAddAuction = ({ open, setOpen, valuation }) => {
  console.log(valuation);
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { openNotification, contextHolder } = useNotification();

  const validateStartDate = (_, value) => {
    const selectedStartDate = value && value[0];
    const currentDate = new Date();
    if (!selectedStartDate || selectedStartDate.isAfter(currentDate)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('Please choose date that is greater than now date')
    );
  };

  const validateEndDate = (_, value) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (
      !selectedEndDate ||
      (selectedStartDate && selectedEndDate.isAfter(selectedStartDate))
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('Please choose start time and end time for auction')
    );
  };
  const validateDateRange = (_, value) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (selectedStartDate && selectedEndDate) {
      const daysDiff = selectedEndDate.diff(selectedStartDate, 'days');
      if (daysDiff > 7) {
        return Promise.reject(
          new Error('The range of start date and end date must be 7 days')
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please choose valid range of date'));
  };
  const disabled7DaysDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, 'days')) >= 7;
    }
    return false;
  };
  const onFinish = async (values) => {
    const startTime = values.dateRange
      ? values.dateRange[0].format('YYYY-MM-DD HH:mm')
      : '';
    const endTime = values.dateRange
      ? values.dateRange[1].format('YYYY-MM-DD HH:mm')
      : '';
    const step = values.step || 0;
    const data = {
      jewelryId,
      startTime,
      endTime,
      step,
    };
    try {
      setLoading(true);
      await wishlistApi.addAuction(data);
      dispatch(setRender(true));
      form.resetFields();
      setOpen(false);
      openNotification({
        type: 'success',
        description: 'Put up to the auction success',
      });
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'This jewelry is existed in auction',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    if (valuation) {
      form.setFieldsValue({ step: valuation?.jewelry?.staringPrice * 0.05 });
    }
  }, [form, valuation]);
  return (
    <Modal
      width={700}
      title={'Enter information'}
      open={open}
      onCancel={handleClose}
      footer={false}
      centered
    >
      {contextHolder}
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Choose date range for auction'
          name='dateRange'
          rules={[
            { required: true, message: 'Must not be empty!' },
            { validator: validateStartDate },
            { validator: validateEndDate },
            { validator: validateDateRange },
          ]}
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder={['Start date', 'End date']}
            className='!w-full'
            needConfirm={false}
            disabledDate={disabled7DaysDate}
          />
        </Form.Item>

        <Form.Item
          label={
            <TitleLabel>
              Step (2% of{' '}
              <span className='text-orange-600'>
                starting price:{' '}
                {formatPriceVND(valuation?.jewelry?.staringPrice)}
              </span>
              )
            </TitleLabel>
          }
          name='step'
        >
          <InputNumber className='!w-full' controls={false} readOnly />
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <PrimaryButton loading={loading} htmlType='submit'>
            Send to auction
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
