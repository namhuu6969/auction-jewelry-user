import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/AuctionPage/components/Home';
import { JewelryList } from '@pages/AuctionPage/components/ProductList';
import { AuctionPage } from '@pages/AuctionPage';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<AuctionPage />}>
        <Route path='' element={<Home />}></Route>
        <Route path='jewelry' element={<JewelryList />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRouting;
