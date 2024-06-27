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
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNotification } from '../../../../../../hooks/useNotification';
import { dataColor } from '../../../../../../utils/colorData/colorUtil';
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
  const [materialsInput, setMaterialsInput] = useState([
    { idMaterial: null, weight: 0 },
  ]);
  const [choosedBrand, setChoosedBrand] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [optionsBrand, setOptionsBrand] = useState([]);
  // const [optionsCollection, setOptionsCollection] = useState([]);
  // const getPanelValueBrand = (searchText) => (!searchText ? [] : itemsBrand);
  // const getPanelValueCollection = (searchText) =>
  //   !searchText ? [] : itemsCollection;

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

  const fetchApiCategory = async () => {
    const response = await requestJewelryApi.getCategory();
    setCategory(response.data);
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
      openNotification({
        type: 'success',
        description: 'Post jewelry success',
      });
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
    setMaterialsInput([...materialsInput, { idMaterial: null, weight: 0 }]);
    form.validateFields(['weight']);
  };

  const removeMaterialInput = (index) => {
    const updatedMaterials = materialsInput.filter((_, idx) => idx !== index);
    setMaterialsInput(updatedMaterials);
    form.resetFields([`material_${index}`, `weight_${index}`]);
    form.validateFields(['weight']);
  };

  const handleMaterialChange = (index, idMaterial) => {
    const updatedMaterials = materialsInput.map((material, idx) =>
      idx === index ? { ...material, idMaterial } : material
    );
    setMaterialsInput(updatedMaterials);
    form.validateFields(['weight']);
  };

  const getFilteredMaterials = (index) => {
    const selectedMaterials = materialsInput
      .filter((_, idx) => idx !== index)
      .map((material) => material.idMaterial);
    return material?.filter((mat) => !selectedMaterials.includes(mat.id));
  };

  const handleWeightChange = (index, weight) => {
    const updatedMaterials = materialsInput.map((material, idx) =>
      idx === index ? { ...material, weight } : material
    );
    setMaterialsInput(updatedMaterials);
    form.validateFields(['weight']);
  };

  useEffect(() => {
    fetchApiCategory();
    fetchBrand();
    fetchCollection();
    fetchMaterial();
  }, []);
  const itemsGender = useMemo(
    () => [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Unisex', value: 'Unisex' },
    ],
    []
  );

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
      value: e?.id,
    }));

  const itemsCollection = collection
    ?.filter((item) => item.brand.id === choosedBrand)
    .map((e) => ({
      label: e?.name,
      value: e?.id,
    }));
  useEffect(() => {
    if (itemsCategory.length > 0) {
      form.setFieldsValue({
        category: itemsCategory[0].value,
        sex: itemsGender[0].value,
        jewelryCondition: itemsCondition[0].value,
      });
    }
  }, [form, itemsCategory, itemsCondition, itemsGender]);

  return (
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
            <Title level={4} className='!mb-0 font-sans !font-normal'>
              Name
            </Title>
          }
          rules={[
            {
              required: true,
              message: 'Must not be empty!',
            },
          ]}
          className='!text-left col-span-1'
        >
          <Input />
        </Form.Item>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Category of jewelry
        </Title>
        <Divider className='!my-3' />
        <div className='flex gap-5'>
          <Form.Item
            name={'category'}
            label={
              <Title level={4} className='!mb-0 font-sans !font-normal'>
                Category
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
              placeholder='Choose category'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsCategory}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'size'}
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
            className='!text-left'
          >
            <Input />
          </Form.Item>
        </div>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Information of jewelry
        </Title>
        <Divider className='!my-3' />
        <div className='grid grid-cols-5 gap-5'>
          <Form.Item
            name={'color'}
            label={
              <Title level={4} className='!mb-0 font-sans !font-normal'>
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
            />
          </Form.Item>
          <Form.Item
            name={'jewelryCondition'}
            label={
              <Title level={4} className='!mb-0 font-sans !font-normal'>
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
              <Title level={4} className='!mb-0 font-sans !font-normal'>
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
              <Title level={4} className='!mb-0 font-sans !font-normal'>
                Brand
              </Title>
            }
            className='!text-left'
          >
            {/* <AutoComplete
                options={optionsBrand}
                onSearch={(text) => setOptionsBrand(getPanelValueBrand(text))}
                placeholder='Choose brand'
                onChange={(value) => setChoosedBrand(value)}
                className='!text-left'
              /> */}
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
              <Title level={4} className='!mb-0 font-sans !font-normal'>
                Collection
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
            {/* <AutoComplete
                options={optionsCollection}
                onSearch={(text) =>
                  setOptionsCollection(getPanelValueCollection(text))
                }
                placeholder='Chọn bộ sưu tập'
                className='!text-left'
                disabled={!choosedBrand}
              /> */}
            <Tooltip title={!choosedBrand && 'Please select brand first'}>
              <Select
                showSearch
                placeholder='Choose collection'
                optionFilterProp='children'
                filterOption={filterOption}
                options={itemsCollection}
                className='!text-left'
                disabled={!choosedBrand}
              />
            </Tooltip>
          </Form.Item>
        </div>
        <Title level={3} className='text-left mt-5 font-serif !text-[#946257]'>
          Weight of jewelry
        </Title>
        <Divider className='!my-3' />
        {materialsInput.map((material, index) => (
          <div key={index} className='grid grid-cols-3 gap-4'>
            <Form.Item
              name={`material_${index}`}
              label={
                <Title level={4} className='!mb-0 font-sans !font-normal'>
                  Material
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
                  level={4}
                  className='!mb-0 font-sans !font-normal'
                >{`Weight of material ${
                  material.idMaterial === 3 ? '(karat)' : '(g)'
                }`}</Title>
              }
              name={`weight_${index}`}
              className='!text-left'
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
        <Button
          type='dashed'
          onClick={addMaterialInput}
          className='w-2/3 flex justify-center font-sans !font-normal'
        >
          Add more material
        </Button>
        <Form.Item
          name={'weight'}
          label={
            <Title level={4} className='!mb-0 font-sans !font-normal'>
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
          <InputNumber controls={false} className='w-1/5' />
        </Form.Item>
        <Form.Item
          name={'description'}
          label={
            <Title level={4} className='!mb-0 font-sans !font-normal'>
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
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name='imagesFile'
          label={
            <Title level={4} className='!mb-0 font-sans !font-normal'>
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
            className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
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
