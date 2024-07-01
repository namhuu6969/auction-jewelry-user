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
import { ProfilePage } from '@pages/AuctionPage/components/ProfilePage';
import WishlistPage from '@pages/AuctionPage/components/Wishlist';
import { ValuationPage } from '@pages/AuctionPage/components/Valuation';
import { Payment } from '@pages/AuctionPage/components/Payment';
import { VerifiedPage } from '../../pages/VerifiedPage';
import CheckoutPage from '../../pages/AuctionPage/components/Checkout';
import { ResultPayment } from '../../pages/AuctionPage/components/Payment/components/ResultPayment/resultPayment';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route exact path='/' element={<AuctionPage />}>
        <Route path='/verified' element={<VerifiedPage />} />
        <Route path='' element={<Home />} />
        <Route path='payment' element={<Payment />} />
        <Route path='resultPayment' element={<ResultPayment />} />
        <Route path='profile' element={<ProfilePage />} />
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
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
      <Route path='*' element={<PagesNotFound />} />
    </Routes>
  );
};

export default AppRouting;
