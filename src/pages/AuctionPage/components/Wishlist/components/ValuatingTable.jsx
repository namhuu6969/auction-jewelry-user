import { useEffect, useState } from 'react';
import { myValuatingApi } from '../../../../../services/api/WishlistApi/myValuatingApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMyValuation } from '../../../../../core/store/WishlistStore/MyValuationStore/myValuation';
import { Dropdown, Image, Menu, Space, Table } from 'antd';
import { setJewelryId } from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalAddAuction } from './components/ModalAddAuction';
import { formatDate, imageURL } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
// import { myAuctionApi } from '@api/WishlistApi/myAuctionApi';
// import { setMyAuctionData } from '@core/store/WishlistStore/MyAuctionStore/myAuction';

export const ValuatingTable = () => {
  const dataSource = useSelector((state) => state.myValuation.myValuationData);
  const { getColumnSearchDateProps } = useTableSearchDate();
  const [open, setOpen] = useState(false);
  const render = useSelector((state) => state.jewelryMe.render);
  // const auctionData = useSelector((state) => state.myAuction.myAuctionData);
  // const [checkAuctioning, setCheckAuctioning] = useState(false);
  const dispatch = useDispatch();
  const formatPriceVND = (price) =>
    price.toLocaleString('vi', { style: 'currency', currency: 'VND' });

  const columns = [
    {
      title: '',
      dataIndex: ['jewelry', 'thumbnail'],
      key: 'image',
      render: (data) => (
        <>
          <Image
            className='!w-[150px] !h-[150px]'
            src={imageURL(data)}
            alt=''
          />
        </>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      ...getColumnSearchDateProps('createdAt'),
      key: 'created',
      render: (data) => formatDate(data),
    },
    {
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
    },
    {
      title: 'Valuation Staff',
      dataIndex: ['staff', 'full_name'],
      key: 'staff',
    },
    {
      title: 'Vauation Value',
      dataIndex: 'valuation_value',
      key: 'valuation_value',
      render: (data) => formatPriceVND(data),
    },
    {
      title: 'Valuation Fee',
      dataIndex: 'valuationFee',
      key: 'valuationFee',
    },
    {
      title: 'Valuation Type',
      dataIndex: 'online',
      key: 'online',
      render: (data) => (data ? 'Online' : 'Offline'),
    },
    {
      title: 'Valuation Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <Dropdown
          overlay={getMenu(data.jewelry.id, data.status, data.jewelry.staringPrice, data.jewelry.status)}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className='text-2xl'>...</p>
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];
  const getMenu = (id, status, startingPrice, statusJewelry) => (
    <Menu>
      <Menu.Item
        key='0'
        disabled={
          status === 'REQUEST' || status === 'VALUATING' || statusJewelry === 'AUCTIONING'
        }
        title={
          (status === 'REQUEST' && 'Staff is valuating this jewelry') ||
          (startingPrice === 0 && 'Staff do not set starting price yet')
        }
      >
        <a onClick={() => handleAddAuctionClick(id)}>Put up auction</a>
      </Menu.Item>
    </Menu>
  );
  const handleAddAuctionClick = (id) => {
    setOpen(true);
    dispatch(setJewelryId(id));
  };
  useEffect(() => {
    const fetchMyValuation = async () => {
      const response = await myValuatingApi.getValuatingMe();
      console.log(response.data);
      dispatch(setMyValuation(response.data));
    };
    // const fetchData = async () => {
    //   const response = await myAuctionApi.getMyAuction();
    //   console.log(response.data);
    //   if (response.data) {
    //     dispatch(setMyAuctionData(response.data));
    //   }
    // };
    fetchMyValuation();
    // fetchData();      
    if (render) {
      fetchMyValuation();
    }
  }, [dispatch, render]);
  return (
    <>
      <ModalAddAuction open={open} setOpen={setOpen} />
      <Table
        scroll={{
          x: 1500,
        }}
        dataSource={[...dataSource]}
        columns={columns}
      />
    </>
  );
};
