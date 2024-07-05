import { useEffect, useState } from 'react';
import { myValuatingApi } from '../../../../../services/api/WishlistApi/myValuatingApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMyValuation } from '../../../../../core/store/WishlistStore/MyValuationStore/myValuation';
import { Dropdown, Image, Menu, Space, Table, Tooltip } from 'antd';
import { setJewelryId } from '../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
import { ModalAddAuction } from './components/ModalAddAuction';
import { formatDate, imageURL } from '../../../../../utils/utils';
import useTableSearchDate from '../../../../../hooks/useTableSearchDate';
import useTableSearch from '../../../../../hooks/useTableSearch';
import { renderStatusJewelry } from '../../../../../utils/RenderStatus/renderStatusUtil';
// import { myAuctionApi } from '@api/WishlistApi/myAuctionApi';
// import { setMyAuctionData } from '@core/store/WishlistStore/MyAuctionStore/myAuction';

export const ValuatingTable = () => {
  const dataSource = useSelector((state) => state.myValuation.myValuationData);
  const { getColumnSearchDateProps } = useTableSearchDate();
  const { getColumnSearchProps } = useTableSearch();
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
      ...getColumnSearchDateProps('createdAt'),
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
    },
    {
      title: 'Name',
      dataIndex: ['jewelry', 'name'],
      key: 'name',
      ...getColumnSearchProps(['jewelry', 'name']),
    },
    {
      title: 'Starting Price',
      dataIndex: ['jewelry', 'staringPrice'],
      key: 'staringPrice',
      render: (data) => formatPriceVND(data),
      sorter: (a, b) =>
        new Date(a?.jewelry?.staringPrice) - new Date(b?.jewelry?.staringPrice),
    },
    {
      title: 'Valuation Staff',
      dataIndex: ['staff', 'full_name'],
      key: 'staff',
    },
    {
      title: 'Valuation Value',
      dataIndex: 'valuation_value',
      key: 'valuation_value',
      render: (data) => formatPriceVND(data),
      sorter: (a, b) =>
        new Date(a?.valuation_value) - new Date(b?.valuation_value),
    },
    {
      title: 'Valuation Fee',
      dataIndex: 'valuatingFee',
      key: 'valuationFee',
      render: (data) => formatPriceVND(data),
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
      title: 'Status',
      dataIndex: ['jewelry', 'status'],
      key: 'status',
      render: (data) => renderStatusJewelry(data)
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (data) => (
        <Dropdown
          overlay={getMenu(
            data.jewelry.id,
            data.status,
            data.jewelry.staringPrice,
            data.jewelry.status,
            data.online
          )}
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
  const handleError = (status, startingPrice, valuationType, statusJewelry) => {
    const error = [];
    if (status === 'REQUEST') {
      error.push('- Staff is valuating this jewelry');
    }
    if (startingPrice === 0) {
      error.push('- Staff has not set the starting price yet');
    }
    if (valuationType === true) {
      error.push(
        '- Online Valuated jewelry cannot be put up for auction! Please valuate this jewelry offline'
      );
    }
    if (statusJewelry === 'AUCTIONING') {
      error.push('- This jewelry is auctioning');
    }
    if(statusJewelry === 'DELIVERING') {
      error.push('This jewelry is checkout')
    }
    if (status) return error.join('\n');
  };

  const getMenu = (id, status, startingPrice, statusJewelry, valuationType) => (
    <Menu>
      <Menu.Item
        key='0'
        disabled={
          status === 'REQUEST' ||
          status === 'VALUATING' ||
          statusJewelry === 'AUCTIONING' ||
          statusJewelry === 'DELIVERING'||
          startingPrice === 0
        }
      >
        <Tooltip
          title={handleError(
            status,
            startingPrice,
            valuationType,
            statusJewelry
          )}
          overlayStyle={{ whiteSpace: 'pre-line' }}
        >
          <span>
            <a onClick={() => handleAddAuctionClick(id)}>Put up auction</a>
          </span>
        </Tooltip>
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
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const filterData = sortedData.filter((element) => !element.online);
      dispatch(setMyValuation(filterData));
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
        dataSource={[...dataSource]}
        columns={columns}
        scroll={{
          x: 2000,
        }}
        pagination={{ pageSize: 4 }}
      />
    </>
  );
};
