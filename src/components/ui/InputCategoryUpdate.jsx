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
              90 cm ~
            </Title>
            <InputNumber
              {...inputProps}
              min={90}
              max={120}
              placeholder='Enter necklace size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 120 cm
            </Title>
          </div>
        );
      case 2:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              6 mm ~
            </Title>
            <InputNumber
              {...inputProps}
              min={6}
              max={25}
              placeholder='Enter earring size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 25 mm
            </Title>
          </div>
        );
      case 3:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              12 cm ~
            </Title>
            <InputNumber
              {...inputProps}
              min={12}
              max={23}
              placeholder='Enter bracelet size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 23 cm
            </Title>
          </div>
        );
      case 4:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              15.7 mm ~
            </Title>
            <InputNumber
              {...inputProps}
              min={15.7}
              max={21.3}
              placeholder='Enter ring size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 21.3 mm
            </Title>
          </div>
        );
      case 5:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              90 cm ~
            </Title>
            <InputNumber
              {...inputProps}
              min={90}
              max={120}
              placeholder='Enter pendants size...'
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 120 cm
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
      {console.log(sizeInput)}
      {handleChangeInputView()}
    </Form.Item>
  );
};
