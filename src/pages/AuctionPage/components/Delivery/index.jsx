import { Empty, Image, Steps, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imageURL } from '../../../../utils/utils';
import { FaBox, FaHandHoldingUsd, FaTruck } from 'react-icons/fa';
import { RiTaskFill } from 'react-icons/ri';
import TitleLabel from '../../../../components/ui/TitleLabel';
import { PrimaryButton } from '../../../../components/ui/PrimaryButton';
import { checkoutApi } from '../../../../services/api/Payment/checkoutApi';
import { useNotification } from '../../../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { renderStatusDeliveryResult } from '../../../../utils/RenderStatus/renderStatusUtil';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';

const statusProps = {
  className: 'flex items-center gap-2',
};

export const FollowDelivery = () => {
  const auction = useSelector((state) => state.delivery.auctionIdDelivery);
  const [dataSource, setDataSource] = useState([]);
  const { openNotification, contextHolder } = useNotification();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const handleStatusAuction = (data) => {
    switch (data) {
      case 'PREPARING':
        return 0;
      case 'DELIVERING':
        return 1;
      case 'DELIVERED':
        return 3;
      case 'RECEIVED':
        return 4;
      default:
        return 0;
    }
  };
  const columns = [
    {
      title: '',
      dataIndex: 'thumbnail',
      key: 'img',
      render: (data) => <Image width={150} height={150} src={imageURL(data)} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Brand',
      dataIndex: ['brand', 'name'],
      key: 'brand',
    },
    {
      title: 'Collection',
      dataIndex: ['collection', 'name'],
      key: 'collection',
    },
    {
      title: 'Condition',
      dataIndex: 'jewelryCondition',
      key: 'condition',
    },
    {
      title: 'Material',
      dataIndex: 'jewelryMaterials',
      render: (jewelryMaterials) => (
        <div className='w-[200px] flex-wrap'>
          {jewelryMaterials.map((material) => (
            <Tag key={material.id} className='col-span-1 text-center w-fit'>
              {material.material.name} - {material.weight}(
              {material.material.unit})
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (data) => <p>{data}(g)</p>,
    },
  ];
  const itemsStep = [
    {
      title: (
        <div {...statusProps}>
          <FaBox />
          Preparing
        </div>
      ),
    },
    {
      title: (
        <div {...statusProps}>
          <FaTruck />
          Delivering
        </div>
      ),
    },
    {
      title: (
        <div {...statusProps}>
          <FaHandHoldingUsd />
          Delivered
        </div>
      ),
    },
    {
      title: (
        <div {...statusProps}>
          <RiTaskFill />
          Confirmed
        </div>
      ),
    },
  ];
  const handleConfirm = async (id) => {
    try {
      await checkoutApi.checkoutConfirm(id);
      openNotification({
        type: 'success',
        description: 'Confirm Success',
      });
      setRender(true);
    } catch (error) {
      openNotification({
        type: 'error',
        description: 'Error',
      });
    }
  };
  useEffect(() => {
    if (auction && Object.keys(auction).length > 0) {
      setDataSource([auction.jewelry]);
    }
    if (render) {
      setDataSource([auction.jewelry]);
    }
  }, [auction, render]);

  const isEmptyObject = (obj) => {
    return !obj || Object.keys(obj).length === 0;
  };
  return !isEmptyObject(auction) ? (
    <div className='flex flex-col gap-10'>
      {contextHolder}
      <TitleLabel className={'!font-semibold'} level={3}>
        {renderStatusDeliveryResult(auction?.status)}
      </TitleLabel>

      <Table
        columns={columns || []}
        dataSource={dataSource || []}
        pagination={false}
      />
      <Steps current={handleStatusAuction(auction?.status)} items={itemsStep} />
      <div className='flex flex-col gap-5'>
        <TitleLabel level={3} className={'text-left'}>
          Delivery Detail
        </TitleLabel>
        <div className='grid grid-cols-3 text-left gap-y-5'>
          <TitleLabel>
            Order ID: <span className='font-bold'>{auction.id}</span>
          </TitleLabel>
          <TitleLabel>
            Name: <span className='font-bold'>{auction.full_name}</span>
          </TitleLabel>
          <TitleLabel>
            Phone Number:
            <span className='font-bold'>{auction.phone_number}</span>
          </TitleLabel>
          <TitleLabel className={'col-span-3'}>
            Address: <span className='font-bold'>{auction.address}</span>
          </TitleLabel>
        </div>
      </div>
      <div className='flex w-full justify-end'>
        {auction.status !== 'DELIVERED' ? (
          <></>
        ) : (
          <PrimaryButton onClick={() => handleConfirm(auction.id)}>
            Confirmed Product
          </PrimaryButton>
        )}
      </div>
    </div>
  ) : (
    <div className='min-h-[55vh]'>
      <Empty />
      <PrimaryButton onClick={() => navigate('/')}>
        Back to auction
      </PrimaryButton>
    </div>
  );
};
