import { DatePicker, InputNumber, Modal } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import { wishlistApi } from '../../../../../services/api/WishlistApi/wishlistApi';
const { RangePicker } = DatePicker;

export const ModalAddAuction = ({ open, setOpen }) => {
  const jewelryId = useSelector((state) => state.wishlist.jewelryId);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState([]);
  const [form] = Form.useForm();

  const handleStartDateChange = (value) => {
    const selectedStartDate = value && value[0];
    const currentDate = new Date();
    if (selectedStartDate && selectedStartDate > currentDate) {
      setStartDate(selectedStartDate);
      console.log(selectedStartDate)
      setError(null);
    } else {
      setError('Vui lòng chọn ngày và giờ lớn hơn ngày giờ hiện tại');
    }
  };

  const handleEndDateChange = (value) => {
    const selectedEndDate = value && value[1];
    if (selectedEndDate && selectedEndDate > startDate) {
      setEndDate(selectedEndDate);
      console.log(selectedEndDate)
      setError(null);
    } else {
      setError('Vui lòng chọn ngày và giờ lớn hơn ngày giờ bắt đầu');
    }
  };
  const onFinish = async (values) => {
    const startTime = startDate ? startDate.format('YYYY-MM-DD HH:mm') : '';
    const endTime = endDate ? endDate.format('YYYY-MM-DD HH:mm') : '';
    const step = values.step || 0;
    const data = {
      jewelryId,
      startTime,
      endTime,
      step,
    };
    console.log(data)
    const response = await wishlistApi.addAuction(data)
  };
  const hasError = error ? true : false;
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setStartDate(null);
    setEndDate(null);
    setError(null)
  };
  return (
    <Modal
      width={700}
      title={'Điền thông tin'}
      open={open}
      onCancel={handleClose}
      footer={false}
      centered
    >
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Chọn ngày đấu giá sản phẩm'
          rules={[
            {
              required: true,
              message: 'Hãy nhập ngày đấu giá!',
            },
          ]}
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
            onChange={(values) => {
              handleStartDateChange(values);
              handleEndDateChange(values);
            }}
            value={[startDate, endDate]}
            className='!w-full'
          />
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Form.Item
          label='Nhập bước nhảy'
          name='step'
          rules={[
            {
              required: true,
              message: 'Hãy nhập bước nhảy!',
            },
          ]}
        >
          <InputNumber className='!w-full' controls={false} min={0} />
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <PrimaryButton htmlType='submit' disabled={hasError}>
            Gửi yêu cầu
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
