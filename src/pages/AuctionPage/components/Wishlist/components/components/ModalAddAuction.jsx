import { DatePicker, InputNumber, Modal } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { wishlistApi } from '../../../../../../services/api/WishlistApi/wishlistApi';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { useNotification } from '../../../../../../hooks/useNotification';
const { RangePicker } = DatePicker;

export const ModalAddAuction = ({ open, setOpen }) => {
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
      new Error('Vui lòng chọn ngày và giờ lớn hơn ngày giờ hiện tại')
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
      new Error('Vui lòng chọn ngày và giờ lớn hơn ngày giờ bắt đầu')
    );
  };
  const validateDateRange = (_, value) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (selectedStartDate && selectedEndDate) {
      const daysDiff = selectedEndDate.diff(selectedStartDate, 'days');
      if (daysDiff > 7) {
        return Promise.reject(
          new Error('Khoảng thời gian không được vượt quá 7 ngày')
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('Vui lòng chọn khoảng thời gian hợp lệ'));
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
        description: 'Đã đưa lên sàn đấu giá thành công',
      });
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Sản phẩm đã đưa lên sàn đấu giá',
      });    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
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
      {contextHolder}
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Chọn ngày đấu giá sản phẩm'
          name='dateRange'
          rules={[
            { required: true, message: 'Hãy nhập ngày đấu giá!' },
            { validator: validateStartDate },
            { validator: validateEndDate },
            { validator: validateDateRange },
          ]}
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
            className='!w-full'
          />
        </Form.Item>

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
          <PrimaryButton loading={loading} htmlType='submit'>
            Gửi yêu cầu
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
