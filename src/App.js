// import './App.css';
// import PublicRoute from '../src/Routes/PublicRoute';
// import PrivateRoute from '../src/Routes/PrivateRoute';
// import { AuthProvider } from '../src/Contexts/authContext';
// import AuthContext from '../src/Contexts/authContext';
// import DashboardView from '../src/components/Private/Dashboards/DashboardView';
// import ProfileView from '../src/components/Private/Profile/ProfileView';
// import { Routes, Route } from 'react-router-dom';
// import Confirmation from './components/Public/Cart/Confirmation';
// import { DependencyProvider } from './DependencyContext';
// import { useContext } from 'react';

// function App() {
//   return (
//     <AuthProvider>
//       <AppRoutes />
//     </AuthProvider>
//   );
// }

// const AppRoutes = () => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div>Loading...</div>; // Vous pouvez remplacer ceci par un spinner de chargement
//   }

//   return (
//     <DependencyProvider user={user}>
//       <Routes>
//         <Route path="/*" element={<PublicRoute />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<DashboardView />} />
//           <Route path="/profile" element={<ProfileView />} />
//           <Route path="/confirmation" element={<Confirmation />} /> {/* Ajouter la route de confirmation */}
//         </Route>

//       </Routes>
//     </DependencyProvider>
//   );
// }

// export default App;
import './App.css';
import PublicRoute from '../src/Routes/PublicRoute';
import PrivateRoute from '../src/Routes/PrivateRoute';
import { AuthProvider } from '../src/Contexts/authContext';
import AuthContext from '../src/Contexts/authContext';
import DashboardView from '../src/components/Private/Dashboards/DashboardView';
import ProfileView from '../src/components/Private/Profile/ProfileView';
import Home from '../src/components/Public/Home/Home';
import Cart from '../src/components/Public/Cart/Total/CartView';
import DetailsProducts from '../src/components/Public/Home/Components/Products/DetailsProducts';
import CarouselComp from '../src/components/Public/Home/Components/Carousel/CarouselComp/CarouselView';
import EpreuvesByCategory from '../src/components/Public/Home/Components//Carousel/EpreuveByCategotyComp/EpreuvesByCategoryView';
import Confirmation from '../src/components/Public/Cart/Confirmation';
import Login from '../src/components/Public/Login/LoginView';
import Register from '../src/components/Public/register/registerView';
import { Routes, Route } from 'react-router-dom';
import { DependencyProvider } from './DependencyContext';
import { useContext } from 'react';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DependencyProvider user={user}>
      <Routes>
        {/* Routes publiques avec layout */}
        <Route path="/*" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="DetailsProducts" element={<DetailsProducts />} />
          <Route path="categories" element={<CarouselComp />} />
          <Route path="category/:category" element={<EpreuvesByCategory />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>

        {/* Routes privées */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<DashboardView />} />
          <Route path="profile" element={<ProfileView />} />
          {/* Supprime confirmation ici si elle est publique */}
        </Route>
      </Routes>
    </DependencyProvider>
  );
}

export default App;
