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
      name: 'Request jewelry',
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
      <div>
        <Title level={2} className='font-serif !text-left !m-0'>Information of jewelry</Title>
        <Title level={4} className='font-sans !text-left !font-normal !m-0'>( Please fill your jewelry information )</Title>
      </div>
      <FormRequest />
    </div>
  ) : (
    <NotAuthorize />
  );
};
