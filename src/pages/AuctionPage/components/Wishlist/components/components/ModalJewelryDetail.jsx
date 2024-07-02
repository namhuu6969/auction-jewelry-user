import {
  Modal,
  Image,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Spin,
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
import { dataColor } from '../../../../../../utils/colorData/colorUtil';
import TitleLabel from '../../../../../../components/ui/TitleLabel';
import { InputCategoryUpdate } from '../../../../../../components/ui/InputCategoryUpdate';

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
  const [loadingRendeer, setLoadingRender] = useState(false);
  const [choosedCategory, setChoosedCategory] = useState(null);
  const [materialsInput, setMaterialsInput] = useState([
    { idMaterial: null, weight: 0 },
  ]);
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
    form.resetFields([`material_${index}`, `weight_${index}`]);
    handleWeightTotalChange(updatedMaterials);
    form.validateFields(['weight']);
  };

  const handleMaterialChange = (index, idMaterial) => {
    const updatedMaterials = materialsInput.map((material, idx) =>
      idx === index ? { ...material, idMaterial } : material
    );
    setMaterialsInput(updatedMaterials);
    handleWeightTotalChange(updatedMaterials);
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
    if (value < totalMaterialWeight) {
      return Promise.reject(
        new Error(
          'Tổng khối lượng chất liệu phải lớn hơn hoặc bằng khối lượng sản phẩm!'
        )
      );
    }
    return Promise.resolve();
  };

  const handleWeightChange = (index, weight) => {
    const updatedMaterials = materialsInput?.map((material, idx) =>
      idx === index ? { ...material, weight } : material
    );
    setMaterialsInput(updatedMaterials);
    handleWeightTotalChange(updatedMaterials);
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

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      materials: materialsInput?.map((e) => ({
        idMaterial: e.idMaterial,
        weight: e.weight,
      })),
    };
    const dataMaterials = {
      materials: materialsInput?.map((e) => ({
        idMaterial: e.idMaterial,
        weight: e.weight,
      })),
    };
    try {
      setLoading(true);
      await myJewelryApi.updateJewelry(jewelryId, data);
      await myJewelryApi.updateMaterialJewelry(
        jewelryId,
        dataMaterials.materials
      );
      openNotification({
        type: 'success',
        description: 'Cập nhật thành công',
      });
      dispatch(setRender(true));
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Updated failed',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleWeightTotalChange = (materials) => {
    const totalWeight = materials.reduce(
      (total, material) => total + material.weight,
      0
    );
    form.setFieldsValue({ weight: totalWeight });
  };

  const getFilteredMaterials = (index) => {
    const selectedMaterials = materialsInput
      .filter((_, idx) => idx !== index)
      .map((material) => material.idMaterial);
    return material?.filter((mat) => !selectedMaterials.includes(mat.id));
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
      try {
        setLoadingRender(true);
        const response = await myJewelryApi.getJewelryById(jewelryId);
        setData(response.data);
        setMaterialsInput(
          response.data?.jewelryMaterials?.map((e) => ({
            idMaterial: e.material.id,
            weight: e.weight,
          }))
        );
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
      } catch (error) {
        openNotification({
          type: 'error',
          description: 'fetch failed',
        });
      } finally {
        setLoadingRender(false);
      }
    };
    if (open) {
      fetchImages();
      fetchApiCategory();
      fetchBrand();
      fetchCollection();
      fetchMaterial();
      fetchJewelryDetail();
      setChoosedBrand(data?.brand?.name);
      setChoosedCategory(data?.category?.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      loading={loadingRendeer}
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
      {!loadingRendeer ? (
        data && (
          <Form form={form} onFinish={handleSubmit} labelCol={{ span: 24 }}>
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
                <div className='grid grid-cols-3 gap-5'>
                  <Form.Item
                    label={<TitleLabel>Name</TitleLabel>}
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
                  <Form.Item label={<TitleLabel>Status</TitleLabel>}>
                    {data.status}
                  </Form.Item>
                </div>

                <div className='grid grid-cols-3 gap-5'>
                  <Form.Item
                    label={<TitleLabel>Category</TitleLabel>}
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
                      onChange={(e) => setChoosedCategory(e)}
                    />
                  </Form.Item>
                  <InputCategoryUpdate
                    value={form.getFieldsValue() && form.getFieldsValue().size}
                    category={choosedCategory}
                    form={form}
                  />
                </div>

                <div className='grid grid-cols-5 gap-5'>
                  <Form.Item
                    label={<TitleLabel>Color</TitleLabel>}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                    ]}
                    name='color'
                  >
                    <Select
                      showSearch
                      placeholder='Choose color'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={dataColor}
                      className='!text-left w-full'
                    />
                  </Form.Item>
                  <Form.Item
                    label={<TitleLabel>Condition</TitleLabel>}
                    name={'jewelryCondition'}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      placeholder='Choose condition'
                      options={[
                        { label: 'New', value: 'New' },
                        { label: 'Used', value: 'Used' },
                      ]}
                      className='!text-left w-full'
                    />
                  </Form.Item>
                  <Form.Item
                    label={<TitleLabel>Gender</TitleLabel>}
                    name={'sex'}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      showSearch
                      placeholder='Choose gender'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsGender}
                      className='!text-left w-full'
                    />
                  </Form.Item>
                  <Form.Item
                    label={<TitleLabel>Brand</TitleLabel>}
                    name={'brand'}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      onChange={(value) => setChoosedBrand(value)}
                      showSearch
                      placeholder='Choose brand'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsBrand}
                      className='!text-left'
                    />
                  </Form.Item>
                  <Form.Item
                    label={<TitleLabel>Collection</TitleLabel>}
                    name={'collection'}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                    ]}
                    className='!text-left'
                  >
                    <Select
                      showSearch
                      placeholder='Choose collection!'
                      optionFilterProp='children'
                      filterOption={filterOption}
                      options={itemsCollection}
                      className='!text-left'
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label={<TitleLabel>Description</TitleLabel>}
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'Must not be empty!',
                    },
                  ]}
                  className='w-full'
                >
                  <Input.TextArea className='w-full' />
                </Form.Item>
                <div>
                  {materialsInput?.map((material, index) => (
                    <div key={index} className='grid grid-cols-4 gap-4'>
                      <Form.Item
                        label={<TitleLabel>Materials</TitleLabel>}
                        className='!text-left col-span-1'
                        rules={[
                          {
                            required: true,
                            message: 'Must not be empty!',
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder='Choose material'
                          optionFilterProp='children'
                          filterOption={filterOption}
                          options={getFilteredMaterials(index)?.map((e) => ({
                            label: e?.name,
                            value: e?.id,
                          }))}
                          className='!text-left !w-full'
                          onChange={(value) =>
                            handleMaterialChange(index, value)
                          }
                          value={material.idMaterial}
                        />
                      </Form.Item>
                      <Form.Item
                        label={<TitleLabel>Weight</TitleLabel>}
                        className='!text-left col-span-1'
                        rules={[
                          {
                            required: true,
                            message: 'Must not be empty!',
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
                          className='mt-3'
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type='dashed'
                    onClick={addMaterialInput}
                    className='w-1/5 flex justify-center'
                  >
                    Add Material
                  </Button>
                  <Form.Item
                    label={<TitleLabel>Weight</TitleLabel>}
                    name={'weight'}
                    rules={[
                      {
                        required: true,
                        message: 'Must not be empty!',
                      },
                      {
                        validator: validateWeightMaterial,
                      },
                    ]}
                    className='!text-left'
                  >
                    <InputNumber readOnly controls={false} className='w-1/5' />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        )
      ) : (
        <Spin />
      )}
    </Modal>
  );
};
