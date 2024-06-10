import { Form, Input, Modal, notification } from 'antd';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useState } from 'react';
import { authApi } from '../../../services/api/auth/authApi';

export const ForgotPassword = ({ openForgot, setOpenForgot }) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title) => {
    api[type]({
      message: title,
      placement: 'top',
      duration: 5,
    });
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = async () => {
    try {
      setLoading(true)
      const response = await authApi.forgotPasswordApi(email);
      openNotificationWithIcon('success', response.message)
      setOpenForgot(false)
      setEmail('')
    } catch (error) {
      openNotificationWithIcon('error', error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <Modal
      title='Quên mật khẩu'
      open={openForgot}
      onCancel={() => setOpenForgot(false)}
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
        <Form.Item label='Nhập Email của bạn'>
          <Input onChange={handleChangeEmail} type='email' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
