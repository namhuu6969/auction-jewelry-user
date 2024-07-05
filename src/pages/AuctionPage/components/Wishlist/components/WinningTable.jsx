import { Image, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../../../../../hooks/useNotification';
import { myAuctionApi } from '../../../../../services/api/WishlistApi/myAuctionApi';
import { setMyWinning } from '../../../../../core/store/WishlistStore/MyAuctionStore/myAuction';
import { formatPriceVND, imageURL } from '../../../../../utils/utils';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { PrimaryButton } from '../../../../../components/ui/PrimaryButton';
import { setAuctionCheckout } from '../../../../../core/store/Checkout/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import {
  renderStatusAuction,
  renderStatusJewelry,
} from '../../../../../utils/RenderStatus/renderStatusUtil';

export const WinningTable = () => {
  const myWinningData = useSelector((state) => state.myAuction.myWinningData);
  const { getColumnSearchProps } = useTableSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { openNotification, contextHolder } = useNotification();
  const columns = [
    {
      title: '',
      dataIndex: ['jewelry', 'thumbnail'],
      key: 'thumbnail',
      render: (data) => <Image src={imageURL(data)} />,
    },
    {
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps(['jewelry', 'name']),
    },
    {
      title: 'Category',
      dataIndex: ['jewelry', 'category', 'name'],
      key: 'category',
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
    },
    {
      title: 'Materials',
      dataIndex: ['jewelry', 'jewelryMaterials'],
      key: 'jewelryMaterials',
      render: (jewelryMaterials) => (
        <div className='grid grid-cols-4 gap-1'>
          {jewelryMaterials.map((material) => (
            <Tag key={material.id} className='col-span-2 text-center w-full'>
              {material.material.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'currentPrice',
      key: 'price',
      render: (data) => formatPriceVND(data),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => renderStatusAuction(data),
    },
    {
      title: 'Jewelry Status',
      dataIndex: ['jewelry', 'status'],
      key: 'jewelryStatus',
      render: (data) => renderStatusJewelry(data),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (data) => (
        <>
          <PrimaryButton
            disabled={data.jewelry.status === 'DELIVERING' && true}
            onClick={() => handleCheckout(data)}
            className={`${
              data.jewelry.status === 'DELIVERING' &&
              'hover:!bg-[#DDD] hover:!text-[#797979] !bg-[#DDD] !text-[#797979]'
            }`}
          >
            Payment
          </PrimaryButton>
        </>
      ),
    },
  ];
  const handleCheckout = (data) => {
    dispatch(setAuctionCheckout(data));
    navigate('/checkout');
  };
  useEffect(() => {
    const fetchDataWinning = async () => {
      try {
        setLoading(true);
        const response = await myAuctionApi.getMyWinningAuction();
        const sortData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        dispatch(setMyWinning(sortData));
      } catch (error) {
        openNotification({
          type: 'error',
          description: 'Error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDataWinning();
  }, [dispatch]);
  return (
    <>
      {contextHolder}
      <Table
        dataSource={myWinningData && myWinningData}
        columns={columns}
        scroll={{
          x: 2000,
        }}
        pagination={{ pageSize: 4 }}
        loading={loading}
      />
    </>
  );
};
