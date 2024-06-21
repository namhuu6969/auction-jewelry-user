import { useEffect, useState } from 'react';
import { myValuatingApi } from '../../../../../services/api/WishlistApi/myValuatingApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMyValuation } from '../../../../../core/store/WishlistStore/MyValuationStore/myValuation';
import { Dropdown, Image, Menu, Space, Table } from 'antd';
import { setJewelryId } from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalAddAuction } from './components/ModalAddAuction';
import { imageURL } from '../../../../../utils/utils';

export const ValuatingTable = () => {
  const dataSource = useSelector((state) => state.myValuation.myValuationData);
  const [open, setOpen] = useState(false);
  const render = useSelector((state) => state.jewelryMe.render);
  const dispatch = useDispatch();
  const formatPriceVND = (price) =>
    price.toLocaleString('vi', { style: 'currency', currency: 'VND' });

  const columns = [
    {
      title: 'Ảnh',
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
      title: 'Tên sản phẩm',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
    },
    {
      title: 'Nhân viên định giá',
      dataIndex: ['staff', 'full_name'],
      key: 'staff',
    },
    {
      title: 'Giá trị định giá',
      dataIndex: 'valuation_value',
      key: 'valuation_value',
      render: (data) => formatPriceVND(data),
    },
    {
      title: 'Phí định giá',
      dataIndex: 'valuationFee',
      key: 'valuationFee',
    },
    {
      title: 'Định giá',
      dataIndex: 'online',
      key: 'online',
      render: (data) => (data ? 'Online' : 'Offline'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (data) => (
        <Dropdown
          overlay={getMenu(data.id, data.status, data.jewelry.staringPrice)}
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
  const getMenu = (id, status, startingPrice) => (
    <Menu>
      <Menu.Item
        key='0'
        disabled={status === 'REQUEST' || startingPrice === 0}
        title={
          (status === 'REQUEST' && 'Sản phẩm đang được định giá') ||
          (startingPrice === 0 && 'Nhân viên chưa đặt giá khởi điểm')
        }
      >
        <a onClick={() => handleAddAuctionClick(id)}>Thêm vào đấu giá</a>
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
      dispatch(setMyValuation(response.data));
    };
    fetchMyValuation();
    if (render) {
      fetchMyValuation();
    }
  }, [dispatch, render]);
  return (
    <>
      {console.log(dataSource)}
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
