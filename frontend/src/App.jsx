import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import MyProducts from './pages/MyProducts';
import MyBids from './pages/MyBids';
import MyOrders from './pages/MyOrders';
import MyAccount from './pages/MyAccount';
import MyDirectSaleProducts from './pages/MyDirectSaleProducts';
import DirectSaleProducts from './pages/DirectSaleProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/direct-sale-products" element={<DirectSaleProducts />} />
        <Route path="/my-direct-sale-products" element={<MyDirectSaleProducts />}/>
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
