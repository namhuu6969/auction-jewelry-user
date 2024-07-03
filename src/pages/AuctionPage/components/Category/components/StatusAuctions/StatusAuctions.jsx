import './StatusAuctions.css';
import { Typography, Checkbox } from 'antd';

const status = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'In Progress',
    value: 'InProgress',
  },
  {
    label: 'Up Coming',
    value: 'Waiting',
  },
  {
    label: 'Ended',
    value: 'Completed',
  },
];

const { Title } = Typography;
export const StatusAuctions = ({ handleFilterChange }) => {
  return (
    <div className='m-4 p-4 shadow-lg rounded-md flex flex-col items-start'>
      <Title level={3}>
        Status
        <div className='mt-2 mb-4 border-b-2 border-black w-30' />
      </Title>
      <div className='w-full mb-4 text-start'>
        <Checkbox.Group
          className='flex-col space-y-2 text-2xl'
          options={status}
          defaultValue={['all']}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};
