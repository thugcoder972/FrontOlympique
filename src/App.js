import './App.css';
import PublicRoute from '../src/Routes/PublicRoute';
import PrivateRoute from '../src/Routes/PrivateRoute';
import { AuthProvider } from '../src/Contexts/authContext';
import AuthContext from '../src/Contexts/authContext';
import DashboardView from '../src/components/Private/Dashboards/DashboardView';
import Profile from './components/Private/Profile';
import { Routes, Route } from 'react-router-dom';
import Confirmation from './components/Public/Cart/Confirmation';
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
    return <div>Loading...</div>; // Vous pouvez remplacer ceci par un spinner de chargement
  }

  return (
    <DependencyProvider user={user}>
      <Routes>
        <Route path="/*" element={<PublicRoute />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirmation" element={<Confirmation />} /> {/* Ajouter la route de confirmation */}
        </Route>
      </Routes>
    </DependencyProvider>
  );
}

export default App;
