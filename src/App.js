
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <Header />
      <div className='row'>
        <div className='col-2 sidebar'>
          <Sidebar/>
        </div>
        <div className='col-10 mainPage'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:productId' element={<ProductDetails />}/>
           </Routes>
        </div>
      </div>
      
    </>
  );
}

export default App;
