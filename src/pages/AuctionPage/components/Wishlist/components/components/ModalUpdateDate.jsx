import { DatePicker, Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { useEffect, useState } from 'react';
import { useNotification } from '../../../../../../hooks/useNotification';
import { myAuctionApi } from '../../../../../../services/api/WishlistApi/myAuctionApi';
import { setMyAuctionData } from '@core/store/WishlistStore/MyAuctionStore/myAuction';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export const ModalUpdateDate = ({ open, setOpen }) => {
  const dataUpdate = useSelector((state) => state.myAuction.dataUpdate);
  const auctionData = useSelector((state) => state.myAuction.myAuctionData);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = useNotification();
  const [dateRange, setDateRange] = useState([null, null]);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const validateStartDate = (_, value) => {
    const selectedStartDate = value && value[0];
    const currentDate = dayjs();
    if (!selectedStartDate || selectedStartDate.isAfter(currentDate)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('Please choose a date that is greater than the current date')
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
      new Error('Please choose a valid start and end time for the auction')
    );
  };

  const validateDateRange = (_, value) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (selectedStartDate && selectedEndDate) {
      const daysDiff = selectedEndDate.diff(selectedStartDate, 'day');
      if (daysDiff > 7) {
        return Promise.reject(
          new Error('The range of start and end dates must be within 7 days')
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please choose a valid date range'));
  };

  const disabled7DaysDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, 'day')) >= 7;
    }
    return false;
  };

  const handleSubmit = async (values) => {
    const formattedDate = {
      startTime: values.dateRange[0].format('YYYY-MM-DD HH:mm'),
      endTime: values.dateRange[1].format('YYYY-MM-DD HH:mm'),
    };
    try {
      setLoading(true);
      const response = await myAuctionApi.updateTimeAuction(
        dataUpdate.id,
        formattedDate
      );
      const updateMyAuction = auctionData.map((auction) =>
        auction.id === response.data.id ? response.data : auction
      );
      dispatch(setMyAuctionData(updateMyAuction));
      openNotification({
        type: 'success',
        description: 'Updated date range session',
      });
      handleClose();
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Failed to update date range',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataUpdate) {
      const start = dataUpdate.startTime ? dayjs(dataUpdate.startTime) : null;
      const end = dataUpdate.endTime ? dayjs(dataUpdate.endTime) : null;
      setDateRange([start, end]);
      form.setFieldsValue({ dateRange: [start, end] });
    }
  }, [dataUpdate, form]);

  return (
    <Modal
      visible={open}
      onCancel={handleClose}
      title='Update Date Range'
      footer={[
        <SecondaryButton key='cancel' onClick={handleClose}>
          Cancel
        </SecondaryButton>,
        <PrimaryButton
          loading={loading}
          onClick={() => form.submit()}
          key='save'
        >
          Update
        </PrimaryButton>,
      ]}
      centered
    >
      {contextHolder}
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
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
            disabledDate={disabled7DaysDate}
            needConfirm={false}
            onChange={(dates) => setDateRange(dates)}
            value={dateRange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
