import { Divider, Form, Input, Modal, Radio, Select, Space } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { myValuatingApi } from '../../../../../../services/api/WishlistApi/myValuatingApi';
import { useNotification } from '../../../../../../hooks/useNotification';
import { useDispatch, useSelector } from 'react-redux';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { useEffect, useState } from 'react';
import TitleLabel from '../../../../../../components/ui/TitleLabel';
import { UserServices } from '../../../../../../services/api/UserServices/UserServices';
import { useNavigate } from 'react-router-dom';

export const ModalOfflineValuate = ({ open, setOpen }) => {
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const [form] = Form.useForm();
  const { openNotification, contextHolder } = useNotification();
  const [method, setMethod] = useState('');
  const [isAtHome, setIsAtHome] = useState(false);
  const [district, setDitrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isShowWard, setIsShowWard] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checkMoney, setCheckMoney] = useState(false);
  const [userMoney, setUserMoney] = useState(0);
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleCancel = () => {
    setMethod('');
    setIsAtHome(false);
    setIsShowWard(false);
    setDitrict([]);
    setWard([]);
    form.resetFields();
    setOpen(false);
  };
  const handleSubmit = () => {
    form.submit();
  };

  const onChangeMethod = (e) => {
    setMethod(e.target.value);
    if (e.target.value === 'AT_HOME_VALUATION') {
      setIsAtHome(true);
    } else {
      setIsAtHome(false);
    }
  };

  const handleWard = async (district) => {
    if (district) {
      const response = await myValuatingApi.getWardApi(district.value);
      const optionResponse = await response.data.map((e) => ({
        label: e.full_name_en,
        value: e.id,
      }));
      setWard(optionResponse);
      setIsShowWard(true);
    }
  };

  const handleFinish = async (values) => {
    let combinedAddress = 'Jewelry Auction Company';
    if (values.valuatingMethod === 'AT_HOME_VALUATION') {
      combinedAddress = `${values.numberAddress}, ${values.ward.label} , ${values.district.label} , Ho Chi Minh City, VN`;
    }
    const data = {
      jewelryId: jewelryId,
      desiredPrice: 0,
      paymentMethod: 'VNPAY',
      notes: 'string',
      valuatingMethod: values.valuatingMethod,
      address: combinedAddress || 'string',
      online: false,
    };
    try {
      setLoading(true);
      if (userMoney < 500000) {
        setCheckMoney(true);
      } else {
        const response = await myValuatingApi.valuateTheJewelry(data);
        openNotification({
          type: 'success',
          description: 'Send request valuation success',
        });
        dispatch(setRender(true));
        setMethod('');
        setIsAtHome(false);
        handleCancel();
      }
    } catch (error) {
      openNotification({
        type: 'error',
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      const fetchProvince = async () => {
        const response = await myValuatingApi.getDistrictApi(79);
        const optionResponse = await response.data.map((e) => ({
          label: e.full_name_en,
          value: e.id,
        }));
        setDitrict(optionResponse);
      };
      fetchProvince();
      const fetchUserData = async () => {
        const response = await UserServices.getProfile();
        setUserMoney(response.data.money);
      };
      fetchUserData();
      // form.setFieldsValue({ valuatingMethod: 'DIRECTLY_VALUATION' });
    }
  }, [form, open]);
  return (
    <>
      <Modal
        width={700}
        open={open}
        onCancel={handleCancel}
        title={'Offline Valuate (You have to payment valuation fee)'}
        footer={[
          <SecondaryButton onClick={handleCancel} key={'cancel'}>
            Cancel
          </SecondaryButton>,
          <PrimaryButton loading={loading} key={'submit'} onClick={handleSubmit}>
            Submit
          </PrimaryButton>,
        ]}
      >
        {contextHolder}
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{
            span: 24,
          }}
          initialValues={{
            valuatingMethod: 'DIRECTLY_VALUATION',
          }}
        >
          <TitleLabel className={'!font-semibold !text-red-600 my-4'}>
            Price for valuation is 500.000đ
          </TitleLabel>
          <Form.Item
            name={'valuatingMethod'}
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
            label={<TitleLabel>Choose method for valuate</TitleLabel>}
          >
            <Radio.Group defaultValue={method} onChange={onChangeMethod}>
              <Space direction='vertical'>
                <Radio value={'DIRECTLY_VALUATION'}>
                  <TitleLabel className={'!font-semibold'}>
                    Valuate at Jewelry Auction CO
                  </TitleLabel>
                  <TitleLabel className={'!font-normal'}>
                    Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho
                    Chi Minh , Vietnam
                  </TitleLabel>
                </Radio>
                <Radio value={'AT_HOME_VALUATION'}>
                  <TitleLabel className={'!font-semibold'}>
                    Valuate at home (In HCM City)
                  </TitleLabel>
                  <TitleLabel className={'!font-normal'}>
                    Staff will valuate at your home
                  </TitleLabel>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          {isAtHome === true && (
            <div>
              <TitleLabel level={5} className={'!font-semibold'}>
                Enter your address
              </TitleLabel>
              <Divider className='!my-2' />
              <Form.Item
                rules={[{ required: true, message: 'Must not be empty!' }]}
                name={'district'}
                label={<TitleLabel>District</TitleLabel>}
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
                className='col-span-2'
              >
                <Input placeholder='Enter your number address' />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
      <ModalNotEnoughMoney open={checkMoney} setOpen={setCheckMoney} />
    </>
  );
};

const ModalNotEnoughMoney = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpen(false);
    navigate('/profile');
  };
  const handleCloseAtManager = () => {
    setOpen(false)
  }
  return (
    <Modal
      title={<TitleLabel level={4}>You do not have enough money to valuating! Please go to recharge</TitleLabel>}
      closable={false}
      open={open}
      onCancel={handleCloseAtManager}
      footer={[
        <PrimaryButton key={'move'} onClick={handleCloseModal}>
          Go to recharge wallet
        </PrimaryButton>,
      ]}
    ></Modal>
  );
};
