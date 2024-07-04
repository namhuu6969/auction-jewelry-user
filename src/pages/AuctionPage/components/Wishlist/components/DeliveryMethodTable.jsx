import { Image, Table } from 'antd';
import { useEffect, useState } from 'react';
import { formatDate, imageURL } from '../../../../../utils/utils';
import { deliveryApi } from '../../../../../services/api/WishlistApi/deliveryApi';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import { useDispatch } from 'react-redux';
import { setDelivery } from '../../../../../core/store/Delivery/deliverySlice';
import { useNavigate } from 'react-router-dom';
import { renderStatusDelivery } from '../../../../../utils/RenderStatus/renderStatusUtil';

export const DeliveryMethodTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const columns = [
    {
      title: '',
      dataIndex: ['jewelry', 'thumbnail'],
      key: 'img',
      render: (data) => <Image width={150} height={150} src={imageURL(data)} />,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'created',
      render: (data) => formatDate(data),
    },
    {
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: ['jewelry', 'brand', 'name'],
      key: 'brand',
    },
    {
      title: 'Collection',
      dataIndex: ['jewelry', 'collection', 'name'],
      key: 'collection',
    },
    {
      title: 'Weight',
      dataIndex: ['jewelry', 'weight'],
      key: 'weight',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => renderStatusDelivery(data)
    },
    {
      title: 'Action',
      render: (data) => (
        <>
          <PrimaryButton onClick={() => handleDelivery(data)}>View Delivery</PrimaryButton>
        </>
      ),
    },
  ];
  const handleDelivery = (data) => {
    dispatch(setDelivery(data))
    navigate('/delivery')
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await deliveryApi.getMyDelivery();
      const updateResponse = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDataSource(updateResponse);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 4 }}
      loading={loading}
    />
  );
};
