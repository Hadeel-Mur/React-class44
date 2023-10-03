import React from 'react';
import Products from './components/Products';
import Product from './components/Product';
import Favourites from './components/Favourites'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/favourites' element={<Favourites/>}/>
        </Routes>
    </Router>
  );
}

export default App;
