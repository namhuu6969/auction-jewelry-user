import { Form, Input, Modal, notification } from 'antd';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useState } from 'react';
import { authApi } from '../../../services/api/auth/authApi';

export const ForgotPassword = ({ openForgot, setOpenForgot }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title) => {
    api[type]({
      message: title,
      placement: 'top',
      duration: 5,
    });
  };
  const handleSubmit = () => {
    form.submit();
  };
  const handleClose = () => {
    setOpenForgot(false);
    form.resetFields();
  };
  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const response = await authApi.forgotPasswordApi(values.email);
      openNotificationWithIcon('success', response.message);
      handleClose();
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('error', error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title='Quên mật khẩu'
      open={openForgot}
      onCancel={handleClose}
      footer={() => (
        <>
          <PrimaryButton loading={loading} onClick={handleSubmit}>
            Gửi
          </PrimaryButton>
        </>
      )}
      centered
    >
      {contextHolder}
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label='Nhập Email của bạn'
          name='email'
          rules={[
            {
              required: true,
              message: 'Hãy nhập email',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
