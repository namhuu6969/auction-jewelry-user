import { Button, Form, Input, InputNumber, Select } from 'antd';
import { TablePrice } from './components/TablePrice';
import { useEffect, useState } from 'react';
import { requestJewelryApi } from '../../../../../services/api/RequestApi/requestJewelryApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotAuthorize from '../../../../../components/ui/NotAuthorize';

export const RequestJewelry = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate()
  const [collection, setCollection] = useState([
    {
      label: 'ABC',
      value: 'ABC',
    },
  ]);
  const authorize = useSelector((state) => state.auth.fullName);
  const fetchApiCategory = async () => {
    const response = await requestJewelryApi.getCategory();
    setCategory(response.data);
  };
  const fetchBrand = async () => {
    const response = await requestJewelryApi.getBrand();
    setBrand(response.data);
  };
  const itemsCategory = category.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const itemsBrand = brand.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const itemsGender = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Femaile',
      value: 'female',
    },
    {
      label: 'Unisex',
      value: 'unisex',
    },
  ];
  const itemMaterials = [
    {
      label: 'Gold',
      value: 'Gold',
    },
    {
      label: 'Silver',
      value: 'silver',
    },
  ];
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    fetchApiCategory();
    fetchBrand();
  }, []);
  return authorize ? (
    <div className='container mx-auto flex flex-col gap-10'>
      <TablePrice />
      <Form
        onFinish={handleSubmit}
        labelCol={{
          span: 24,
        }}
        className='!font-sans'
        size='large'
      >
        <div className='grid grid-cols-4 gap-5'>
          <Form.Item
            name={'name'}
            label='Jewelry name'
            rules={[
              {
                required: true,
                message: 'Please input jewelry name!',
              },
            ]}
            className='!text-left col-span-2'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'weight'}
            label='Weight'
            rules={[
              {
                required: true,
                message: 'Please input weight!',
              },
            ]}
            className='!text-left'
          >
            <InputNumber controls={false} className='w-full' />
          </Form.Item>
          <Form.Item
            name={'size'}
            label='Size'
            rules={[
              {
                required: true,
                message: 'Please input size!',
              },
            ]}
            className='!text-left'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'color'}
            label='Color'
            rules={[
              {
                required: true,
                message: 'Please input color!',
              },
            ]}
            className='!text-left'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'category'}
            label='Category'
            rules={[
              {
                required: true,
                message: 'Please select category!',
              },
            ]}
            className='!text-left'
          >
            <Select
              showSearch
              placeholder='Select category'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsCategory}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'brand'}
            label='Brand'
            rules={[
              {
                required: true,
                message: 'Please select brand!',
              },
            ]}
            className='!text-left'
          >
            <Select
              showSearch
              placeholder='Select brand'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsBrand}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'collection'}
            label='Collection'
            rules={[
              {
                required: true,
                message: 'Please select collection!',
              },
            ]}
            className='!text-left'
          >
            <Select
              showSearch
              placeholder='Select collection'
              optionFilterProp='children'
              filterOption={filterOption}
              options={collection}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'jewelryCondition'}
            label='Condition'
            rules={[
              {
                required: true,
                message: 'Please input condition!',
              },
            ]}
            className='!text-left'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'sex'}
            label='Sex'
            rules={[
              {
                required: true,
                message: 'Please input condition!',
              },
            ]}
            className='!text-left'
          >
            <Select
              showSearch
              placeholder='Select collection'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsGender}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'itemMaterials'}
            label='Materials'
            rules={[
              {
                required: true,
                message: 'Please input condition!',
              },
            ]}
            className='!text-left'
          >
            <Select
              mode='multiple'
              showSearch
              placeholder='Select collection'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemMaterials}
              className='!text-left'
            />
          </Form.Item>
        </div>

        <Form.Item
          name={'description'}
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please input your jewelry description!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item className='w-60 mx-auto lg:mt-10'>
          <Button
            className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
            type='primary'
            htmlType='submit'
          >
            Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <NotAuthorize />
  );
};
