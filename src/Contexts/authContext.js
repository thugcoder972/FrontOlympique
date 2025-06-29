import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Ajout d'Axios pour les intercepteurs

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Centralisation de la gestion des tokens
  const setAuthTokens = useCallback((token, refreshToken) => {
    localStorage.setItem('access_token', token);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser({ token });
  }, []);

  const clearAuthTokens = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  // 2. Chargement initial optimisé
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // 3. Login avec gestion d'erreur améliorée
  const login = async (username, password) => {
    try {
      const response = await axios.post('https://srv881328.hstgr.cloud/api/login', {
        username,
        password
      });
      
      setAuthTokens(response.data.token, response.data.refreshToken);
      return response.data;
    } catch (error) {
      clearAuthTokens();
      throw error.response?.data || { error: 'Login failed' };
    }
  };

  // 4. Logout simplifié
  const logout = () => {
    clearAuthTokens();
    // Optionnel : Appel API pour invalider le token côté serveur
  };

  // 5. Ajout du refresh token (optionnel mais recommandé)
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('https://srv881328.hstgr.cloud/api/refresh', {
        refreshToken
      });
      setAuthTokens(response.data.token, response.data.refreshToken);
      return response.data.token;
    } catch (error) {
      clearAuthTokens();
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        loading,
        refreshToken // À exposer si nécessaire
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;