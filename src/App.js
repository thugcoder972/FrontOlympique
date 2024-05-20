
import './App.css';
import PublicRoute from '../src/Routes/PublicRoute';
import PrivateRoute from '../src/Routes/PrivateRoute';
import { AuthProvider } from './Contexts/authContext';
import Login from './components/Public/Login/Login';
import Dashboard from './components/Private/Dashboard';
import Profile from './components/Private/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
    
    <Routes>
          <Route path="/login" element={<Login />} />
      
          <Route path="/*" element={<PublicRoute />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

    </AuthProvider>
  );
}

export default App;