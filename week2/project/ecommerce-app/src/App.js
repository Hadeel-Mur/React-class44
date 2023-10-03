import React from 'react'
import Products from './components/Products';
import Product from './components/Product';
import {  Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path='/products/:id' element={<Product/>} />
      </Routes>
  
  );
}


export default App;
