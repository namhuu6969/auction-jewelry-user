import { Form, Input, Select, Typography } from 'antd';
import TitleLabel from '../../../../../components/ui/TitleLabel';
import { myValuatingApi } from '../../../../../services/api/WishlistApi/myValuatingApi';
import { useEffect, useState } from 'react';
const { Title } = Typography;

export const UserInformationItem = ({ form }) => {
  const [district, setDitrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isShowWard, setIsShowWard] = useState(false);
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleWard = async (district) => {
    if (district) {
      const response = await myValuatingApi.getWardApi(district.value);
      const optionResponse = await response.data.map((e) => ({
        label: e.full_name_en,
        value: e.id,
      }));
      console.log(optionResponse);

      setWard(optionResponse);
      setIsShowWard(true);
    }
  };

  useEffect(() => {
    const fetchProvince = async () => {
      const response = await myValuatingApi.getDistrictApi(79);
      const optionResponse = await response.data.map((e) => ({
        label: e.full_name_en,
        value: e.id,
      }));
      setDitrict(optionResponse);
    };
    fetchProvince();
  }, []);
  return (
    <div>
      <Title level={3} className='!font-sans !font-normal text-left'>
        Personal Information
      </Title>
      <div className='grid grid-cols-3 gap-x-5'>
        <Form.Item
          name='full_name'
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          label={<TitleLabel>Full name:</TitleLabel>}
          className='text-left'
        >
          <Input placeholder='Enter name' />
        </Form.Item>
        <Form.Item
          name={'phone_number'}
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
            {
              pattern: /^\d{10}$/,
              message: 'At least 10 numbers',
            },
          ]}
          label={<TitleLabel>Phone number:</TitleLabel>}
          className='text-left'
        >
          <Input type='tel' placeholder='E.g: 0123456789' />
        </Form.Item>
      </div>
      <Title level={3} className='!font-sans !font-normal text-left'>
        Address
      </Title>
      <div className='col-span-3 grid grid-cols-3 gap-x-5'>
        <Form.Item
          rules={[{ required: true, message: 'Must not be empty!' }]}
          name={'district'}
          label={<TitleLabel>District</TitleLabel>}
          className='text-left'
        >
          <Select
            placeholder='Select a district'
            labelInValue
            options={district}
            optionFilterProp='children'
            filterOption={filterOption}
            showSearch
            onChange={handleWard}
          ></Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Must not be empty!' }]}
          name={'ward'}
          label={<TitleLabel>Ward</TitleLabel>}
          className='text-left'
        >
          <Select
            placeholder='Select a ward'
            labelInValue
            options={ward}
            optionFilterProp='children'
            filterOption={filterOption}
            showSearch
            disabled={!isShowWard}
          ></Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Must not be empty!' }]}
          name={'numberAddress'}
          label={<TitleLabel>Number address</TitleLabel>}
          className='text-left'
        >
          <Input placeholder='Enter your number address' />
        </Form.Item>
      </div>
    </div>
  );
};
