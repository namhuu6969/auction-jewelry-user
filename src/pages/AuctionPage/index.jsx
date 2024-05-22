import { AppLayout } from '@core/layout/AppLayout';
import { Outlet } from 'react-router-dom';

export const AuctionPage = () => {
  return <AppLayout components={<Outlet />} />;
};
