import React from 'react'
import Layout from '../components/Public/Layout'
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Public/Home/Home';
import News from '../components/Public/News/News';
import Top from '../components/Public/Top/Top';
import Category from '../components/Public/Category/Category';
import Cart from '../components/Public/Cart/Cart';
import DetailsProducts from '../components/Public/Home/Components/Products/DetailsProducts';

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
