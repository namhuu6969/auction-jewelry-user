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
