// src/Routes/PublicRoute.js

import React from 'react';
import Layout from '../components/Public/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Public/Home/Home';
import Cart from '../components/Public/Cart/Total/CartView';
import DetailsProducts from '../components/Public/Home/Components/Products/DetailsProducts';
import CarouselComp from '../components/Public/Home/Components/Carousel/CarouselComp/CarouselView';
import EpreuvesByCategory from '../components/Public/Home/Components//Carousel/EpreuveByCategotyComp/EpreuvesByCategoryView';
import Confirmation from '../components/Public/Cart/Confirmation';
import Login from '../components/Public/Login/LoginView';
import Register from '../components/Public/register/registerView';

export default function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/DetailsProducts" element={<DetailsProducts />} />
        <Route path="/categories" element={<CarouselComp />} />
        <Route path="/category/:category" element={<EpreuvesByCategory />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>
    </Routes>
  );
}
