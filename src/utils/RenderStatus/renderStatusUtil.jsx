import { FaBox, FaHandHoldingUsd, FaTruck } from 'react-icons/fa';
import { RiTaskFill } from 'react-icons/ri';

export const renderStatusJewelry = (status) => {
  if (status) {
    switch (status) {
      case 'OFFLINE_VALUATING':
        return <p className='text-yellow-500'>VALUATING</p>;
      case 'STORED':
        return <p className='text-blue-500'>STORE</p>;
      case 'PENDING':
        return <p className='text-cyan-600'>PENDING</p>;
      case 'ONLINE_VALUATED':
        return <p className='text-purple-500'>ONLINE VALUATED</p>;
      case 'AUCTIONING':
        return <p className='text-green-500'>AUCTIONING</p>;
      default:
        return status;
    }
  }
};

export const renderStatusAuction = (status) => {
  if (status) {
    switch (status) {
      case 'InProgress':
        return <p className='text-blue-500'>In Progress</p>;
      case 'Completed':
        return <p className='text-green-500'>Completed</p>;
      case 'Cancel':
        return <p className='text-red-500'>Cancel</p>;
      default:
        return status;
    }
  }
};

export const renderStatusDelivery = (status) => {
  if (status) {
    switch (status) {
      case 'PREPARING':
        return <p className='text-yellow-500'>Preparing</p>;
      case 'DELIVERING':
        return <p className='text-blue-500'>Delivering</p>;
      case 'DELIVERED':
        return <p className='text-orange-500'>Delivered</p>;
      case 'RECEIVED':
        return <p className='text-green-500'>Received</p>;
    }
  }
};

export const renderStatusDeliveryResult = (status) => {
  const flexProps = {
    className: 'flex items-center gap-5',
  };
  const flexColumn = {
    className: 'flex flex-col gap-5',
  };
  const textDesc = {
    className: '!m-0 text-left font-normal text-xl',
  };
  if (status) {
    switch (status) {
      case 'PREPARING':
        return (
          <div {...flexColumn}>
            <div {...flexProps}>
              <FaBox size={30} className='text-yellow-500 animate-delivering' />
              <p className='text-yellow-500 !m-0'>Preparing</p>
            </div>
            <p {...textDesc}>Your product is preparing</p>
          </div>
        );
      case 'DELIVERING':
        return (
          <>
            <div {...flexColumn}>
              <div {...flexProps}>
                <FaTruck
                  size={30}
                  className='text-blue-500 animate-delivering'
                />
                <p className='text-blue-500 !m-0'>Delivering</p>{' '}
              </div>
              <p {...textDesc}>Your product is on the way</p>
            </div>
          </>
        );
      case 'DELIVERED':
        return (
          <>
            <div {...flexColumn}>
              <div {...flexProps}>
                <FaHandHoldingUsd
                  size={30}
                  className='text-orange-500 animate-delivering'
                />
                <p className='text-orange-500 !m-0'>Delivered</p>{' '}
              </div>
              <p {...textDesc}>Your product is delivered! Please confirm</p>
            </div>
          </>
        );
      case 'RECEIVED':
        return (
          <>
            <div {...flexColumn}>
              <div {...flexProps}>
                <RiTaskFill
                  size={30}
                  className='text-green-500 animate-delivering'
                />
                <p className='text-green-500 !m-0'>Received</p>{' '}
              </div>
              <p {...textDesc}>Thanks for using our service</p>
            </div>
          </>
        );
    }
  }
};
