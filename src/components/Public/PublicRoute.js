import React from 'react'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import News from './News/News';
import Top from './Top/Top';
import Category from './Category/Category';
import Cart from './Cart/Cart';
import DetailsProducts from './Home/Components/Products/DetailsProducts';

export default function PublicRoute() {
  return (
    <Routes>
    <Route element={<Layout/>}>
      <Route path='/' element={<Home />} />
      <Route path='/News' element={<News/>} />
      <Route path='/Top' element={<Top/>} />
      <Route path='/Category' element={<Category/>} />
      <Route path='/cart' element={<Cart />}/>
      <Route path='/DetailsProducts' element={<DetailsProducts />}/>
    </Route>
    
    </Routes>
  )
}
