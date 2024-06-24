import { DatePicker, Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNotification } from '../../../../../../hooks/useNotification';
import { myAuctionApi } from '../../../../../../services/api/WishlistApi/myAuctionApi';
import { setMyAuctionData } from '@core/store/WishlistStore/MyAuctionStore/myAuction';
const { RangePicker } = DatePicker;

export const ModalUpdateDate = ({ open, setOpen }) => {
  const dataUpdate = useSelector((state) => state.myAuction.dataUpdate);
  const auctionData = useSelector((state) => state.myAuction.myAuctionData);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = useNotification();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const validateDateRange = (_, value) => {
    if (!value || !value[0] || !value[1]) {
      return Promise.reject(new Error('Please choose a valid range of date'));
    }

    const [startDate, endDate] = value;
    const currentDate = moment();

    if (startDate.isBefore(currentDate)) {
      return Promise.reject(
        new Error('Start date must be greater than the current date')
      );
    }

    if (endDate.isBefore(startDate)) {
      return Promise.reject(new Error('End date must be after the start date'));
    }

    const daysDiff = endDate.diff(startDate, 'days');
    if (daysDiff > 7) {
      return Promise.reject(
        new Error('The range of start date and end date must be within 7 days')
      );
    }

    return Promise.resolve();
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
      const updateMyAuction = auctionData.map(auction => auction.id === response.data.id ? response.data : auction)
      dispatch(setMyAuctionData(updateMyAuction));
      openNotification({
        type: 'success',
        description: 'Updated date range session'
      })
      handleClose()
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        dateRange: [
          dataUpdate.startTime ? moment(dataUpdate.startTime) : null,
          dataUpdate.endTime ? moment(dataUpdate.endTime) : null,
        ],
      });
    }
  }, [dataUpdate, form]);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title='Update Date Range'
      footer={[
        <SecondaryButton key={'cancel'} onClick={handleClose}>
          Cancel
        </SecondaryButton>,
        <PrimaryButton loading={loading} onClick={() => form.submit()} key={'save'}>
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
            { validator: validateDateRange },
          ]}
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            placeholder={['Start date', 'End date']}
            className='!w-full'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
