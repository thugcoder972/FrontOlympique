
import './App.css';
import PublicRoute from '../src/Routes/PublicRoute';
import PrivateRoute from '../src/Routes/PrivateRoute';
import { AuthProvider } from './Contexts/authContext';
// import Login from './components/Public/Login/Login';
import Dashboard from './components/Private/Dashboard';
import Profile from './components/Private/Profile';
import { Routes, Route } from 'react-router-dom';
import Confirmation from './components/Public/Cart/Confirmation'; 

function App() {
  return (
    <AuthProvider>
    
    <Routes>
       
        <Route path="/*" element={<PublicRoute />} />
       
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirmation" element={<Confirmation />} /> {/* Add confirmation route */}
        </Route>
       
      </Routes>

    </AuthProvider>
  );
}

export default App;