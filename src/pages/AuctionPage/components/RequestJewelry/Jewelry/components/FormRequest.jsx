import { useEffect, useMemo, useState } from 'react';
import { requestJewelryApi } from '../../../../../../services/api/RequestApi/requestJewelryApi';
import {
  // AutoComplete,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNotification } from '../../../../../../hooks/useNotification';
import { dataColor as initialDataColor } from '../../../../../../utils/colorData/colorUtil';
import { InputCategoryRequest } from '../../../../../../components/ui/InputCategoryRequest';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const FormRequest = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { openNotification, contextHolder } = useNotification();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [collection, setCollection] = useState([]);
  const [material, setMaterial] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState(null);
  const [materialsInput, setMaterialsInput] = useState([
    { idMaterial: null, weight: 0, unit: '' },
  ]);
  const [choosedBrand, setChoosedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRender, setLoadingRender] = useState(false);
  const navigate = useNavigate();
  const [disabledButtonAdd, setDisabledButtonAdd] = useState(false);
  const [dataColor, setDataColor] = useState(initialDataColor);
  const [newColor, setNewColor] = useState('');

  const handleAddColor = () => {
    if (newColor && !dataColor.find((color) => color.value === newColor)) {
      setDataColor([...dataColor, { value: newColor, label: newColor }]);
      setNewColor('');
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      openNotification({
        type: 'error',
        description: 'File image must be JPG/PNG/JPEG !',
      });
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
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
          'The total weight of material must be greater than or equal to the weight of the product!'
        )
      );
    }
    return Promise.resolve();
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (values?.name) formData.append('name', values.name);
      if (values?.description)
        formData.append('description', values.description);
      if (values?.category) formData.append('category', values.category);
      if (values?.weight) formData.append('weight', values.weight);
      if (values?.size) formData.append('size', values.size);
      if (values?.color) formData.append('color', values.color);
      if (values?.sex) formData.append('sex', values.sex);
      if (values?.brand) formData.append('brand', values.brand);
      if (values?.jewelryCondition)
        formData.append('jewelryCondition', values.jewelryCondition);
      if (values?.collection) formData.append('collection', values.collection);

      if (materialsInput.length > 0) {
        materialsInput.forEach((material, index) => {
          if (material.idMaterial !== null) {
            formData.append(
              `materials[${index}].idMaterial`,
              material.idMaterial
            );
            formData.append(`materials[${index}].weight`, material.weight);
          }
        });
      }

      if (values?.imagesFile && values.imagesFile.length > 0) {
        formData.append('imageThumbnail', values.imagesFile[0].originFileObj);
        values.imagesFile.forEach((file) => {
          formData.append('imagesFile', file.originFileObj);
        });
      }

      await requestJewelryApi.addRequestJewelry(formData);
      form.resetFields();
      setMaterialsInput([{ idMaterial: null, weight: 0 }]);
      setChoosedBrand(null);
      setChoosedCategory(null);
      openNotification({
        type: 'success',
        description: 'Post jewelry success',
      });
      navigate('/wishlist');
    } catch (error) {
      openNotification({
        type: 'error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const addMaterialInput = () => {
    setMaterialsInput([...materialsInput, { idMaterial: null, weight: 0, unit: '' }]);
    form.validateFields(['weight']);
  };

  const removeMaterialInput = (index) => {
    const updatedMaterials = materialsInput.filter((_, idx) => idx !== index);
    setMaterialsInput(updatedMaterials);
    form.resetFields([`material_${index}`, `weight_${index}`]);
    handleWeightTotalChange(updatedMaterials);
    form.validateFields(['weight']);
  };

  const getFilteredMaterials = (index) => {
    const selectedMaterials = materialsInput
      .filter((_, idx) => idx !== index)
      .map((material) => material.idMaterial);
    return material?.filter((mat) => !selectedMaterials.includes(mat.id));
  };

  const handleMaterialChange = (index, idMaterial) => {
    const selectedMaterial = material.find((mat) => mat.id === idMaterial);
    const updatedMaterials = materialsInput.map((material, idx) =>
      idx === index ? { ...material, idMaterial, unit: selectedMaterial ? selectedMaterial.unit : '' } : material
    );
    setMaterialsInput(updatedMaterials);
    handleWeightTotalChange(updatedMaterials);
    form.validateFields(['weight']);
  };

  const handleWeightChange = (index, weight) => {
    const updatedMaterials = materialsInput.map((material, idx) =>
      idx === index ? { ...material, weight } : material
    );
    setMaterialsInput(updatedMaterials);
    handleWeightTotalChange(updatedMaterials);
    form.validateFields(['weight']);
  };

  const handleWeightTotalChange = (materials) => {
    const totalWeight = materials.reduce(
      (total, material) => total + material.weight,
      0
    );
    form.setFieldsValue({ weight: totalWeight });
  };

  const itemsCondition = useMemo(
    () => [
      { label: 'Half New', value: 'New' },
      { label: 'Used', value: 'Used' },
    ],
    []
  );
  const itemsCategory = category?.map((e) => ({
    label: e?.name,
    value: e?.id,
  }));

  const itemsBrand = brand
    ?.filter((e) => e?.name !== null)
    ?.map((e) => ({
      label: e?.name,
      value: e?.name,
    }));

  const itemsCollection = collection
    ?.filter((item) => item.brand.name === choosedBrand)
    .map((e) => ({
      label: e?.name,
      value: e?.name,
    }));

  const itemsGender = useMemo(
    () => [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Unisex', value: 'Unisex' },
    ],
    []
  );

  const handleSetValueOfCategory = (value) => {
    form.setFieldsValue({ category: value });
    setChoosedCategory(value);
  };

  useEffect(() => {
    const fetchApiCategory = async () => {
      try {
        setLoadingRender(true);
        const response = await requestJewelryApi.getCategory();
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRender(false);
      }
    };

    const fetchBrand = async () => {
      const response = await requestJewelryApi.getBrand();
      setBrand(response.data);
    };

    const fetchCollection = async () => {
      const response = await requestJewelryApi.getCollection();
      setCollection(response.data);
    };

    const fetchMaterial = async () => {
      const response = await requestJewelryApi.getMaterial();
      setMaterial(response.data);
    };
    fetchApiCategory();
    fetchBrand();
    fetchCollection();
    fetchMaterial();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      sex: itemsGender[0].value,
      jewelryCondition: itemsCondition[0].value,
    });
  }, []);

  useEffect(() => {
    if (materialsInput.length >= (material?.length || 0)) {
      setDisabledButtonAdd(true);
    } else {
      setDisabledButtonAdd(false);
    }
  }, [materialsInput, material]);

  return loadingRender ? (
    <Spin />
  ) : (
    <>
      {contextHolder}
      <Form
        onFinish={handleSubmit}
        labelCol={{
          span: 24,
        }}
        className='!font-sans'
        size='large'
        form={form}
      >
        <Form.Item
          name={'name'}
          label={
            <Title level={5} className='!mb-0 font-sans !font-normal'>
              Name
            </Title>
          }
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
            {
              validator: (_, value) => {
                if (value && value.trim()) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Whitespace-only is not allowed!')
                );
              },
            },
          ]}
          className='!text-left col-span-1'
        >
          <Input placeholder='Enter jewelry name...' className='!w-full' />
        </Form.Item>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Category
        </Title>
        <Divider className='!my-3' />
        <div className='grid gap-5 grid-cols-4'>
          <Form.Item
            name={'category'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Category
              </Title>
            }
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
            className='!text-left col-span-1 flex !w-full'
          >
            <Select
              showSearch
              placeholder='Choose category'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsCategory}
              className='!text-left !w-[350px]'
              onSelect={handleSetValueOfCategory}
            />
          </Form.Item>
          <InputCategoryRequest category={choosedCategory} form={form} />
        </div>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Information
        </Title>
        <Divider className='!my-3' />
        <div className='grid grid-cols-5 gap-5'>
          <Form.Item
            name={'color'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Color
              </Title>
            }
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
            className='!text-left'
          >
            <Select
              options={dataColor}
              placeholder='Choose color'
              optionFilterProp='children'
              filterOption={filterOption}
              showSearch
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div
                    style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}
                  >
                    <Input
                      style={{ flex: 'auto' }}
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                    />
                    <Button type='link' onClick={handleAddColor}>
                      Add new color
                    </Button>
                  </div>
                </>
              )}
            />
          </Form.Item>
          <Form.Item
            name={'jewelryCondition'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Condition
              </Title>
            }
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
            className='!text-left'
          >
            <Select
              defaultValue={'New'}
              placeholder='Choose condition'
              options={itemsCondition}
              className='!text-left'
            />
          </Form.Item>

          <Form.Item
            name={'sex'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Gender
              </Title>
            }
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
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
            name={'brand'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Brand
              </Title>
            }
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
            name={'collection'}
            label={
              <Title level={5} className='!mb-0 font-sans !font-normal'>
                Collection (Choose brand first)
              </Title>
            }
            className='!text-left'
            rules={[
              {
                required: true,
                message: 'Must not be empty!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder='Choose collection'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsCollection}
              className='!text-left'
              disabled={!choosedBrand}
            />
          </Form.Item>
        </div>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Weight
        </Title>
        <Divider className='!my-3' />
        <div className='flex'>
          <div className='w-[90%]'>
            {materialsInput.map((material, index) => (
              <div key={index} className='grid grid-cols-5 gap-4 col-span-2'>
                <Form.Item
                  name={`material_${index}`}
                  label={
                    <Title level={5} className='!mb-0 font-sans !font-normal'>
                      Material
                    </Title>
                  }
                  className='!text-left col-span-2'
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
                    onChange={(value) => handleMaterialChange(index, value)}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <Title
                      level={5}
                      className='!mb-0 font-sans !font-normal'
                    >{`Weight of material (${material.unit})`}</Title>
                  }
                  name={`weight_${index}`}
                  className='!text-left col-span-2'
                  rules={[
                    { required: true, message: 'Must not be empty!' },
                    {
                      type: 'number',
                      min: 0.00000000000000001,
                      message: 'Weight must be greater than 0!',
                    },
                  ]}
                >
                  <InputNumber
                    placeholder='Enter material weight...'
                    controls={false}
                    value={material.weight}
                    onChange={(e) => handleWeightChange(index, e)}
                    className='w-full'
                  />
                </Form.Item>
                {index > 0 && (
                  <MinusCircleOutlined
                    onClick={() => removeMaterialInput(index)}
                    style={{
                      fontSize: '24px',
                      color: '#ff4d4f',
                      cursor: 'pointer',
                    }}
                    className='mt-5'
                  />
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-start mt-10'>
            <Button
              type='primary'
              onClick={addMaterialInput}
              className='!w-[50px] !h-[50px] flex justify-center font-sans !font-normal rounded-full'
              disabled={disabledButtonAdd}
              shape='circle'
              icon={<FaPlus />}
              title='Add more material'
            ></Button>
          </div>
        </div>
        <Form.Item
          name={'weight'}
          label={
            <Title level={5} className='!mb-0 font-sans !font-normal'>
              Weight (g)
            </Title>
          }
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
            {
              validator: validateWeightMaterial,
            },
          ]}
          className='!text-left h-24'
        >
          <InputNumber
            placeholder='Total of material weight'
            readOnly
            controls={false}
            className='w-1/5'
          />
        </Form.Item>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Description
        </Title>
        <Divider className='!my-3' />
        <Form.Item
          name={'description'}
          label={
            <Title level={5} className='!mb-0 font-sans !font-normal'>
              Description
            </Title>
          }
          className='!text-left'
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
        >
          <Input.TextArea placeholder='Enter jewelry description...' rows={4} />
        </Form.Item>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Image
        </Title>
        <Divider className='!my-3' />
        <Form.Item
          name='imagesFile'
          label={
            <Title level={5} className='!mb-0 font-sans !font-normal'>
              Upload jewelry image (The first image will be thumbnail){' '}
            </Title>
          }
          valuePropName='fileList'
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Must not be empty!' }]}
          className='!text-left'
        >
          <Upload
            name='images'
            listType='picture-card'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            accept='image/png, image/jpeg, image/jpg'
          >
            {fileList.length >= 8 ? null : (
              <div>
                <UploadOutlined />
                <div
                  style={{ marginTop: 8 }}
                  className='font-sans !font-normal'
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item className='w-60 mx-auto lg:mt-10'>
          <Button
            className={`w-full bg-[#946257] font-serif  hover:!shadow-none  hover:!bg-[#946257]`}
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Send jewelry
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
