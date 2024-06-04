import { useEffect, useState } from 'react';
import { requestJewelryApi } from '../../../../../../services/api/RequestApi/requestJewelryApi';
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const FormRequest = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [collection, setCollection] = useState([]);
  const [material, setMaterial] = useState([]);
  const conditionItem = [
    {
      label: 'New',
      value: 'New',
    },
    {
      label: 'Used',
      value: 'Used',
    },
  ];
  const [choosedBrand, setChoosedBrand] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const handleMaterialsChange = (selectedIds) => {
    const newSelectedMaterials = selectedIds.map((id) => {
      const existing = selectedMaterials.find((m) => m.idMaterial === id);
      return existing || { idMaterial: id, weight: null };
    });
    setSelectedMaterials(newSelectedMaterials);
  };
  const handleWeightChange = (id, weight) => {
    setSelectedMaterials((prevState) =>
      prevState.map((m) => (m.idMaterial === id ? { ...m, weight: weight } : m))
    );
  };
  const handleChoosedBrandChange = (value) => {
    setChoosedBrand(value);
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
  const itemsCollection = collection
    .filter((item) => item.brand.id === choosedBrand)
    .map((e) => ({
      label: e.name,
      value: e.id,
    }));
  const itemsMaterial = material.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleSubmit = (values) => {
    const materials = selectedMaterials.map((material) => ({
      idMaterial: material.idMaterial,
      weight: values[`material_${material.idMaterial}`],
    }));
    
    const { imagesFile, ...restValues } = values;
    const imagesFileUrls = imagesFile.map((file) => file.thumbUrl || file.url);
    selectedMaterials.forEach((material) => {
      delete restValues[`material_${material.idMaterial}`];
    });

    const updatedValues = {
      jewelryRequest: {
        ...restValues,
        materials,
      },
      imageThumbnail: imagesFileUrls[0],
      imagesFile: imagesFileUrls,
    };

    console.log(updatedValues);
  };

  useEffect(() => {
    fetchApiCategory();
    fetchBrand();
    fetchCollection();
    fetchMaterial();
  }, []);
  return (
    <>
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
            label='Tên trang sức'
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên trang sức!',
              },
            ]}
            className='!text-left col-span-2'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'weight'}
            label='Cân nặng'
            rules={[
              {
                required: true,
                message: 'Hãy nhập cân nặng!',
              },
            ]}
            className='!text-left'
          >
            <InputNumber controls={false} className='w-full' />
          </Form.Item>
          <Form.Item
            name={'size'}
            label='Kích thước'
            rules={[
              {
                required: true,
                message: 'Hãy nhập kích thước!',
              },
            ]}
            className='!text-left'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'color'}
            label='Màu'
            rules={[
              {
                required: true,
                message: 'Hãy nhập màu!',
              },
            ]}
            className='!text-left'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'jewelryCondition'}
            label='Chất lượng'
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
              options={conditionItem}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'category'}
            label='Danh mục'
            rules={[
              {
                required: true,
                message: 'Hãy chọn danh mục!',
              },
            ]}
            className='!text-left'
          >
            <Select
              showSearch
              placeholder='Chọn danh mục'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsCategory}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'brand'}
            label='Hãng'
            rules={[
              {
                required: true,
                message: 'Hãy chọn hãng!',
              },
            ]}
            className='!text-left'
          >
            <Select
              onChange={handleChoosedBrandChange}
              showSearch
              placeholder='Chọn hãng'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsBrand}
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'collection'}
            label='Bộ sưu tập (Vui lòng chọn hãng trước)'
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
              disabled={choosedBrand ? false : true}
            />
          </Form.Item>
          <Form.Item
            name={'sex'}
            label='Giới tính'
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
              className='!text-left'
            />
          </Form.Item>
          <Form.Item
            name={'materials'}
            label='Chất liệu'
            rules={[
              {
                required: true,
                message: 'Hãy nhập chất liệu!',
              },
            ]}
            className='!text-left'
          >
            <Select
              mode='multiple'
              showSearch
              placeholder='Chọn chất liệu'
              optionFilterProp='children'
              filterOption={filterOption}
              options={itemsMaterial}
              className='!text-left'
              onChange={handleMaterialsChange}
            />
          </Form.Item>
          {selectedMaterials.map((material) => (
            <Form.Item
              name={`material_${material.idMaterial}`}
              key={material.idMaterial}
              label={`Nhập cân nặng của ${
                itemsMaterial.filter(
                  (item) => item.value === material.idMaterial
                )[0].label
              }`}
              className='!text-left'
              rules={[
                { required: true, message: 'Hãy nhập cân nặng của vật liệu' },
              ]}
            >
              <InputNumber
                controls={false}
                value={material.weight}
                onChange={(e) => handleWeightChange(material.idMaterial, e)}
                className='w-full'
              />
            </Form.Item>
          ))}
        </div>

        <Form.Item
          name={'description'}
          label='Mô tả sản phẩm'
          className='!text-left'
          rules={[
            {
              required: true,
              message: 'Hãy nhập mô tả sản phẩm!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='imagesFile'
          label='Đăng ảnh sản phẩm'
          valuePropName='fileList'
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Hãy đăng ảnh sản phẩm' }]}
          className='!text-left'
        >
          <Upload
            name='images'
            listType='picture-card'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item className='w-60 mx-auto lg:mt-10'>
          <Button
            className='w-full bg-[#946257] font-serif hover:!bg-[#946257] hover:!shadow-none'
            type='primary'
            htmlType='submit'
          >
            Gửi yêu cầu
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
