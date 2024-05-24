import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/AuctionPage/components/Home';
import { AuctionPage } from '@pages/AuctionPage';
import { ProductList } from '@pages/AuctionPage/components/ProductList';
import { JewelryList } from '@pages/AuctionPage/components/ProductList/components/JewelryList/JewelryList';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<AuctionPage />}>
        <Route path='' element={<Home />}></Route>
        <Route path='jewelry' element={<ProductList />}>
          <Route path='' element={<JewelryList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouting;
