import { Form, Input, InputNumber, Typography } from 'antd';
import { useEffect, useState } from 'react';
const { Title } = Typography;

export const InputCategoryUpdate = ({ category, form, value }) => {
  const [sizeInput, setSizeInput] = useState(null);
  const handleChangeInput = (value) => {
    form.setFieldsValue({ size: value });
    setSizeInput(value);
  };
  const handleChangeInputView = () => {
    const inputProps = {
      className: '!w-1/2',
      controls: false,
      onChange: handleChangeInput,
      value: sizeInput,
    };
    switch (category) {
      case 1:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              36 ~
            </Title>
            <InputNumber
              {...inputProps}
              min={36}
              max={60}
              placeholder='Enter necklace size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 60
            </Title>
          </div>
        );
      case 2:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              6 ~
            </Title>
            <InputNumber
              {...inputProps}
              min={6}
              max={25}
              placeholder='Enter earring size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 25
            </Title>
          </div>
        );
      case 3:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              14 ~
            </Title>
            <InputNumber
              {...inputProps}
              min={14}
              max={25}
              placeholder='Enter bracelet size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 25
            </Title>
          </div>
        );
      case 4:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              6 ~
            </Title>
            <InputNumber
              {...inputProps}
              min={6}
              max={20}
              placeholder='Enter ring size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 20
            </Title>
          </div>
        );
      case 5:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              36 ~
            </Title>
            <InputNumber
              {...inputProps}
              min={36}
              max={60}
              placeholder='Enter pendants size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 60
            </Title>
          </div>
        );
      default:
        return <Input defaultValue={'Please choose category'} readOnly />;
    }
  };
  useEffect(() => {
    setSizeInput(value);
  }, [value]);
  return (
    <Form.Item
      name='size'
      label={
        <Title level={4} className='!mb-0 font-sans !font-normal'>
          Size
        </Title>
      }
      rules={[
        {
          required: true,
          message: 'Must not be empty!',
        },
      ]}
      className='!text-left col-span-2'
    >
      {handleChangeInputView()}
    </Form.Item>
  );
};
