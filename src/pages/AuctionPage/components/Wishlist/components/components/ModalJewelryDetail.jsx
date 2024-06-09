import { Modal, Descriptions, Image, Divider, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

export const ModalJewelryDetail = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const jewelryData = useSelector((state) => state.jewelryMe.jewelryData);
  const data = jewelryData.find(item => item.id === jewelryId);

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
          <Col span={8}>
            <Image
              width="100%"
              src={data.thumbnail ? `path/to/thumbnails/${data.thumbnail}` : '/path/to/default-image.png'}
              alt={data.name}
            />
          </Col>
          <Col span={16}>
            <Descriptions title="Thông tin chi tiết" bordered column={2}>
              <Descriptions.Item label="Tên">{data.name}</Descriptions.Item>
              <Descriptions.Item label="Mô tả">{data.description}</Descriptions.Item>
              <Descriptions.Item label="Danh mục">{data.category.name}</Descriptions.Item>
              <Descriptions.Item label="Cân nặng">{data.weight} g</Descriptions.Item>
              <Descriptions.Item label="Kích thước">{data.size}</Descriptions.Item>
              <Descriptions.Item label="Màu sắc">{data.color}</Descriptions.Item>
              <Descriptions.Item label="Hãng">{data.brand.name}</Descriptions.Item>
              <Descriptions.Item label="Chất lượng">{data.jewelryCondition}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{data.status}</Descriptions.Item>
              <Descriptions.Item label="Bộ sưu tập">{data.collection.name}</Descriptions.Item>
              <Descriptions.Item label="Chất liệu">
                {data.jewelryMaterials.map((material) => (
                  <div key={material.id}>{material.material.name}: {material.weight} g</div>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions title="Thông tin người bán" bordered column={1}>
              <Descriptions.Item label="Tên người bán">{data.sellerId.full_name}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{data.sellerId.phone_number}</Descriptions.Item>
              <Descriptions.Item label="Email">{data.sellerId.email}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{data.sellerId.address}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      )}
    </Modal>
  );
};
