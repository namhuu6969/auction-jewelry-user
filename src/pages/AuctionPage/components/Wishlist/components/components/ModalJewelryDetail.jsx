import { Modal, Descriptions, Image, Divider, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getImage, imageURL } from '../../../../../../utils/utils';

export const ModalJewelryDetail = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const jewelryData = useSelector((state) => state.jewelryMe.jewelryData);
  const data = jewelryData.find((item) => item.id === jewelryId);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImage(jewelryId);
      setImages(images);
    };
    if (open) {
      fetchImages();
    }
  }, [jewelryId, open]);

  return (
    <Modal
      width={1500}
      title={`Chi tiết của ${data?.name}`}
      open={open}
      onCancel={handleClose}
      footer={false}
      centered
    >
      {data && (
        <Row gutter={16}>
          <Col span={8} className='grid grid-cols-2 !h-fit gap-y-8'>
            {images.map((e) => (
              <Image
                key={e.id}
                width='200px'
                height={'200px'}
                src={imageURL(e?.url)}
                alt={data.name}
              />
            ))}
          </Col>
          <Col span={16}>
            <Descriptions title='Thông tin chi tiết' bordered column={2}>
              <Descriptions.Item label='Tên'>{data.name}</Descriptions.Item>
              <Descriptions.Item label='Mô tả'>
                {data.description}
              </Descriptions.Item>
              <Descriptions.Item label='Danh mục'>
                {data.category.name}
              </Descriptions.Item>
              <Descriptions.Item label='Cân nặng'>
                {data.weight} g
              </Descriptions.Item>
              <Descriptions.Item label='Kích thước'>
                {data.size}
              </Descriptions.Item>
              <Descriptions.Item label='Màu sắc'>
                {data.color}
              </Descriptions.Item>
              <Descriptions.Item label='Hãng'>
                {data.brand.name}
              </Descriptions.Item>
              <Descriptions.Item label='Chất lượng'>
                {data.jewelryCondition}
              </Descriptions.Item>
              <Descriptions.Item label='Trạng thái'>
                {data.status}
              </Descriptions.Item>
              <Descriptions.Item label='Bộ sưu tập'>
                {data.collection.name}
              </Descriptions.Item>
              <Descriptions.Item label='Chất liệu'>
                {data.jewelryMaterials.map((material) => (
                  <div key={material.id}>
                    {material.material.name}: {material.weight} g
                  </div>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title='Thông tin người bán' bordered column={1}>
              <Descriptions.Item label='Tên người bán'>
                {data.sellerId.full_name}
              </Descriptions.Item>
              <Descriptions.Item label='Số điện thoại'>
                {data.sellerId.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {data.sellerId.email}
              </Descriptions.Item>
              <Descriptions.Item label='Địa chỉ'>
                {data.sellerId.address}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      )}
    </Modal>
  );
};
