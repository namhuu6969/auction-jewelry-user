import { Form, Input, Typography } from 'antd';
import TitleLabel from '../../../../../components/ui/TitleLabel';
const { Title } = Typography;

export const UserInformationItem = () => {
  return (
    <div>
      <Title level={3} className='!font-sans !font-normal text-left'>
        User Information
      </Title>
      <div className='grid grid-cols-2 gap-x-5'>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          label={<TitleLabel>User name:</TitleLabel>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          label={<TitleLabel>Phone number:</TitleLabel>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          className='col-span-2'
          label={<TitleLabel>Address:</TitleLabel>}
        >
          <Input />
        </Form.Item>
      </div>
    </div>
  );
};
