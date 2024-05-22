import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import { JewelryList } from '../../pages/JewelryList';

const AppRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auction' element={<JewelryList />} />
    </Routes>
  );
};

export default AppRouting;
