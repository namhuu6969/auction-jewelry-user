import NotAuthorize from '../../../../../components/ui/NotAuthorize';
import Breadcum from '@components/ui/Breadcum';
import { FormRequest } from './components/FormRequest';
import PolicyRequest from './components/PolicyRequest';
import { Divider, Flex, Typography } from 'antd';
const { Title } = Typography;

export const RequestJewelry = () => {
  const authorize = localStorage.getItem('fullName');
  const breadcumLink = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Yêu cầu trang sức',
      link: '/request/jewelry',
    },
  ];
  return authorize ? (
    <div className='container mx-auto flex flex-col gap-10'>
      <Flex className='flex-col'>
        <Breadcum linkBreadcum={breadcumLink} />
        <Divider className='border-black' />
      </Flex>
      <PolicyRequest />
      <Title level={4} className='font-serif'>Thông tin của trang sức</Title>
      <FormRequest />
    </div>
  ) : (
    <NotAuthorize />
  );
};
