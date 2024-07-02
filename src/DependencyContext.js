import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from '../src/Contexts/authContext';
import DashboardViewModel from '../src/components/Private/Dashboards/DashboardViewModel';
import ProfileViewModel from '../src/components/Private/Profile/ProfileViewModel';
import CarouselViewModel from '../src/components/Public/Home/Components/Carousel/CarouselComp/CarouselViewModel';
import EpreuvesByCategoryViewModel from '../src/components/Public/Home/Components/Carousel/EpreuveByCategotyComp/EpreuvesByCategoryViewModel';
import RegisterViewModel from '../src/components/Public/register/RegisterViewModel';
import LoginViewModel from '../src/components/Public/Login/LoginViewModel';
import CartViewModel from '../src/components/Public/Cart/Total/CartViewModel';
import { fetchUserAchats, fetchTicketDetails } from '../src/components/Private/Dashboards/api';
import { fetchUserProfile, updateUserProfile } from '../src/components/Private/Profile/api';
import { getCategories, getTicketsByCategory } from '../src/components/Public/Home/Components/Carousel/carouselApi';


const DependencyContext = createContext();

export const DependencyProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const dashboardViewModel = new DashboardViewModel(user, fetchUserAchats, fetchTicketDetails);
  const profileViewModel = new ProfileViewModel(user, fetchUserProfile, updateUserProfile);
  const carouselViewModel = new CarouselViewModel(getCategories);
  const epreuvesByCategoryViewModel = new EpreuvesByCategoryViewModel(getTicketsByCategory);
  const registerViewModel = new RegisterViewModel();
  const loginViewModel = new LoginViewModel({ setUser: (user) => user }); // Passer le contexte Auth
  const cartViewModel = new CartViewModel(user, cart, dispatch);

  return (
    <DependencyContext.Provider value={{
      dashboardViewModel,
      profileViewModel,
      carouselViewModel,
      epreuvesByCategoryViewModel,
      registerViewModel,
      loginViewModel,
      cartViewModel
    }}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useDependencies = () => {
  return useContext(DependencyContext);
};
