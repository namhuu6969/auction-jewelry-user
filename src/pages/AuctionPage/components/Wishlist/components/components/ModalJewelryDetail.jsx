import {
  Modal,
  Descriptions,
  Image,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImage, imageURL } from '../../../../../../utils/utils';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { wishlistApi } from '../../../../../../services/api/WishlistApi/wishlistApi';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useNotification } from '../../../../../../hooks/useNotification';
import { myJewelryApi } from '../../../../../../services/api/WishlistApi/myJewelryApi';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';

export const ModalJewelryDetail = ({ open, setOpen }) => {
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const [data, setData] = useState({});
  const { openNotification, contextHolder } = useNotification();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [collection, setCollection] = useState([]);
  const [choosedBrand, setChoosedBrand] = useState('');
  const [material, setMaterial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materialsInput, setMaterialsInput] = useState([]);
  const [form] = Form.useForm();

  const handleSaveChange = () => {
    form.submit();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setData([]);
    setMaterialsInput([]);
  };

  const addMaterialInput = () => {
    setMaterialsInput([...materialsInput, { idMaterial: null, weight: 0 }]);
    form.validateFields(['weight']);
  };

  const removeMaterialInput = (index) => {
    const updatedMaterials = materialsInput.filter((_, idx) => idx !== index);
    setMaterialsInput(updatedMaterials);
    form.validateFields(['weight']);
  };

  const handleMaterialChange = (index, idMaterial) => {
    const updatedMaterials = materialsInput?.map((material, idx) =>
      idx === index ? { ...material, idMaterial } : material
    );
    setMaterialsInput(updatedMaterials);
    form.validateFields(['weight']);
  };

  const validateWeightMaterial = (_, value) => {
    const totalMaterialWeight = materialsInput.reduce(
      (total, material) => total + material.weight,
      0
    );
    if (materialsInput.length === 0) {
      return Promise.resolve();
    }
    if (value !== totalMaterialWeight) {
      return Promise.reject(
        new Error('Tổng khối lượng chất liệu phải bằng khối lượng sản phẩm!')
      );
    }
    return Promise.resolve();
  };

  const handleWeightChange = (index, weight) => {
    const updatedMaterials = materialsInput?.map((material, idx) =>
      idx === index ? { ...material, weight } : material
    );
    setMaterialsInput(updatedMaterials);
    form.validateFields(['weight']);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const itemsCategory = category?.map((e) => ({
    label: e?.name,
    value: e?.id,
  }));

  const itemsBrand = brand?.map((e) => ({
    label: e?.name,
    value: e?.name,
  }));

  const itemsCollection = collection
    ?.filter((item) => item.brand.name === choosedBrand)
    ?.map((e) => ({
      label: e?.name,
      value: e?.name,
    }));

  const itemsGender = [
    {
      label: 'Nam',
      value: 'Male',
    },
    {
      label: 'Nữ',
      value: 'Female',
    },
    {
      label: 'Unisex',
      value: 'Unisex',
    },
  ];

  const itemsMaterial = material?.map((e) => ({
    label: e?.name,
    value: e?.id,
  }));

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      materials: materialsInput?.map((e) => ({
        idMaterial: e.idMaterial,
        weight: e.weight,
      })),
    };
    try {
      setLoading(true);
      await myJewelryApi.updateJewelry(jewelryId, data);
      openNotification({
        type: 'success',
        description: 'Cập nhật thành công',
      });
      dispatch(setRender(true));
    } catch (error) {
      openNotification({
        type: 'error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImage(jewelryId);
      setImages(images);
    };
    const fetchApiCategory = async () => {
      const response = await wishlistApi.getCategory();
      setCategory(response.data);
    };

    const fetchBrand = async () => {
      const response = await wishlistApi.getBrand();
      setBrand(response.data);
    };

    const fetchCollection = async () => {
      const response = await wishlistApi.getCollection();
      setCollection(response.data);
    };

    const fetchMaterial = async () => {
      const response = await wishlistApi.getMaterial();
      setMaterial(response.data);
    };

    const fetchJewelryDetail = async () => {
      const response = await myJewelryApi.getJewelryById(jewelryId);
      setData(response.data);
      setMaterialsInput(
        response.data?.jewelryMaterials?.map((e) => ({
          idMaterial: e.material.id,
          weight: e.weight,
        }))
      );
    };
    if (open) {
      fetchImages();
      fetchApiCategory();
      fetchBrand();
      fetchCollection();
      fetchMaterial();
      fetchJewelryDetail();
      setChoosedBrand(data?.brand?.name)
      form.setFieldsValue({
        name: data?.name,
        description: data?.description,
        category: data?.category?.id,
        weight: data?.weight,
        size: data?.size,
        color: data?.color,
        sex: data?.sex,
        brand: data?.brand?.name,
        jewelryCondition: data?.jewelryCondition,
        collection: data?.collection?.name,
      });
    }
  }, [
    jewelryId,
    open,
    form,
    data?.name,
    data?.description,
    data?.category?.id,
    data?.weight,
    data?.size,
    data?.color,
    data?.sex,
    data?.brand?.name,
    data?.jewelryCondition,
    data?.collection?.name,
  ]);

  return (
    <Modal
      width={1800}
      title={`Chi tiết của ${data?.name}`}
      open={open}
      onCancel={handleClose}
      footer={[
        <SecondaryButton
          onClick={handleClose}
          className={'text-md px-5'}
          key='cancel'
        >
          Hủy
        </SecondaryButton>,
        <PrimaryButton
          onClick={handleSaveChange}
          className={'text-md px-5'}
          key='save'
          type='primary'
          loading={loading}
        >
          Lưu
        </PrimaryButton>,
      ]}
      centered
    >
      {data && (
        <Form form={form} onFinish={handleSubmit}>
          {contextHolder}
          <Row gutter={16}>
            <Col span={6} className='grid grid-cols-2 !h-fit gap-y-8'>
              {images?.map((e) => (
                <Image
                  key={e.id}
                  width='200px'
                  height={'200px'}
                  src={imageURL(e?.url)}
                  alt={data.name}
                />
              ))}
            </Col>
            <Col span={18}>
              <Descriptions title='Thông tin chi tiết' bordered column={3}>
                <Descriptions.Item label='Tên' span={1}>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập tên trang sức',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Màu sắc' span={1}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập tên màu sắc',
                      },
                    ]}
                    name='color'
                  >
                    <Input controls={false} className='w-full' />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Kích thước' span={1}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập kích thước!',
                      },
                    ]}
                    name='size'
                  >
                    <Input controls={false} className='w-full' />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Danh mục' span={1}>
                  <Form.Item
                    name={'category'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy chọn danh mục!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder='Chọn danh mục'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsCategory}
                      className='w-full'
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Hãng' span={1}>
                  <Form.Item
                    name={'brand'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy chọn hãng!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      onChange={(value) => setChoosedBrand(value)}
                      showSearch
                      placeholder='Chọn hãng'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsBrand}
                      className='!text-left'
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Bộ sưu tập' span={1}>
                  <Form.Item
                    name={'collection'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy chọn bộ sưu tập!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      showSearch
                      placeholder='Chọn bộ sưu tập'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsCollection}
                      className='!text-left'
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Chất lượng' span={1}>
                  <Form.Item
                    name={'jewelryCondition'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập chất lượng!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      placeholder='Chọn chất lượng'
                      options={[
                        { label: 'New', value: 'New' },
                        { label: 'Used', value: 'Used' },
                      ]}
                      className='!text-left w-full'
                    />
                  </Form.Item>{' '}
                </Descriptions.Item>
                <Descriptions.Item label='Giới tính' span={1}>
                  <Form.Item
                    name={'sex'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập giới tính!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      showSearch
                      placeholder='Chọn giới tính'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsGender}
                      className='!text-left w-full'
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Trạng thái' span={1}>
                  {data.status}
                </Descriptions.Item>
                <Descriptions.Item span={3} label='Mô tả'>
                  <Form.Item
                    name='description'
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập mô tả!',
                      },
                    ]}
                    className='w-full'
                  >
                    <Input.TextArea className='w-full' />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item
                  label='Cân nặng'
                  className='min-w-fit'
                  span={1}
                >
                  <Form.Item
                    name={'weight'}
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập cân nặng!',
                      },
                      {
                        validator: validateWeightMaterial,
                      },
                    ]}
                    className='!text-left'
                  >
                    <InputNumber controls={false} className='w-[400px]' />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label='Chất liệu' span={2}>
                  {materialsInput?.map((material, index) => (
                    <div key={index} className='grid grid-cols-5 gap-4'>
                      <Form.Item
                        className='!text-left col-span-2'
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập chất liệu!',
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder='Chọn chất liệu'
                          optionFilterProp='children'
                          filterOption={filterOption}
                          options={itemsMaterial}
                          className='!text-left !w-full'
                          onChange={(value) =>
                            handleMaterialChange(index, value)
                          }
                          value={material.idMaterial}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Cân nặng'
                        className='!text-left col-span-2'
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập cân nặng của vật liệu',
                          },
                        ]}
                      >
                        <InputNumber
                          controls={false}
                          value={material.weight}
                          onChange={(value) => handleWeightChange(index, value)}
                          className='w-full'
                        />
                      </Form.Item>
                      {index > 0 && (
                        <MinusCircleOutlined
                          onClick={() => removeMaterialInput(index)}
                          style={{
                            fontSize: '24px',
                            color: '#ff4d4f',
                          }}
                          className='!flex flex-col justify-start items-start col-span-1'
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type='dashed'
                    onClick={addMaterialInput}
                    className='w-full flex justify-center'
                  >
                    Thêm chất liệu
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
