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
        return <p className='text-green-500'>AUCTIONING</p>
      default:
        return status;
    }
  }
};
