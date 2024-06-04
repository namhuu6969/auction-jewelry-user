import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/AuctionPage/components/Home';
import { AuctionPage } from '@pages/AuctionPage';
import { ProductList } from '@pages/AuctionPage/components/ProductList';
import { JewelryList } from '@pages/AuctionPage/components/ProductList/components/JewelryList/JewelryList';
import { Login } from '@pages/LoginPage';
import { Register } from '@pages/RegisterPage';
import { JewelryDetail } from '@pages/AuctionPage/components/ProductList/components/JewelryDetail';
import { About } from '@pages/AuctionPage/components/About';
import { PagesNotFound } from '@pages/PagesNotFound/PagesNotFound';
import { Category } from '@pages/AuctionPage/components/Category';
import { Request } from '@pages/AuctionPage/components/RequestJewelry';
import { RequestJewelry } from '@pages/AuctionPage/components/RequestJewelry/Jewelry';
import WishlistPage from '@pages/AuctionPage/components/Wishlist';
import { ValuationPage } from '@pages/AuctionPage/components/Valuation';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route exact path='/' element={<AuctionPage />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='auction' element={<Category />} />
        <Route path='jewelry' element={<ProductList />}>
          <Route path='' element={<JewelryList />} />
          <Route path='detail/:id' element={<JewelryDetail />} />
        </Route>
        <Route path='request' element={<Request />}>
          <Route path='jewelry' element={<RequestJewelry />} />
        </Route>
        <Route path='wishlist' element={<WishlistPage />} />
        <Route path='valuation' element={<ValuationPage />} />
      </Route>
      <Route path='*' element={<PagesNotFound />} />
    </Routes>
  );
};

export default AppRouting;
