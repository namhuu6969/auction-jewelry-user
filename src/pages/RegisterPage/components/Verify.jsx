import { Button, Modal, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const Verify = ({ open = false, setOpen }) => {
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={<Button onClick={() => navigate('/login')}>Go to login</Button>}
    >
      <Result
        status='success'
        title={
          <Title level={4} className='font-sans'>
            Sign up successfully
          </Title>
        }
        subTitle={
          <Title level={5} className='font-sans'>
            Please check mail to verify your account
          </Title>
        }
      />
    </Modal>
  );
};

export default Verify;
