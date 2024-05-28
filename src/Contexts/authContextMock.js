// src/Contexts/authContextMock.js
import React from 'react';

const AuthContext = React.createContext();

export const AuthProviderMock = ({ children, value }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

export default AuthContext;
