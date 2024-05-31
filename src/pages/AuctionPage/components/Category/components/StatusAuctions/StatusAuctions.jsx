import './StatusAuctions.css';
import { Typography, Checkbox } from 'antd';

const status = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Đang diễn ra',
    value: 'inprogress',
  },
  {
    label: 'Sắp diễn ra',
    value: 'upcoming',
  },
  {
    label: 'Đã Kết thúc',
    value: 'ended',
  },
];

const { Title } = Typography;
export const StatusAuctions = ({ onChange }) => {
  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Trạng Thái Tài Sản
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>
      <div className='w-full mb-4 text-start'>
        <Checkbox.Group
          className='flex-col space-y-2 text-2xl'
          options={status}
          defaultValue={['Option 1']}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
