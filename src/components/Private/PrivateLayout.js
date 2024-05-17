import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Public/Navbar/NavBar';

export default function PrivateLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}