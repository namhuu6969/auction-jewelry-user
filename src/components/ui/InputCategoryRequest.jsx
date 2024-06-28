import { Form, Input, InputNumber, Typography } from 'antd';
const { Title } = Typography;

export const InputCategoryRequest = ({ category, form }) => {
  const handleChangeInput = (value) => {
    form.setFieldsValue({ size: value });
  };
  const handleChangeInputView = () => {
    switch (category) {
      case 1:
        return (
          <div className='flex gap-5 items-center'>
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              90 cm ~
            </Title>
            <InputNumber
              className='!w-1/2'
              min={90}
              max={120}
              placeholder='Enter necklace size...'
              controls={false}
              onChange={handleChangeInput}
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
              className='!w-1/2'
              min={6}
              max={25}
              placeholder='Enter earring size...'
              controls={false}
              onChange={handleChangeInput}
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
              className='!w-1/2'
              min={12}
              max={23}
              placeholder='Enter bracelet size...'
              controls={false}
              onChange={handleChangeInput}
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
              className='!w-1/2'
              min={15.7}
              max={21.3}
              placeholder='Enter ring size...'
              controls={false}
              onChange={handleChangeInput}
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
              className='!w-1/2'
              min={90}
              max={120}
              placeholder='Enter pendants size...'
              controls={false}
              onChange={handleChangeInput}
            />
            <Title level={5} className='font-sans !font-normal w-fit !m-0'>
              ~ 120 cm
            </Title>
          </div>
        );
        default: 
        return <Input defaultValue={'Please choose category'} disabled />
    }
  };
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
