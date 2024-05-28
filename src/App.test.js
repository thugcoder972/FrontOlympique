// src/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AuthContext, { AuthProviderMock } from './Contexts/authContextMock';
import App from './App';

const mockStore = configureMockStore();
const store = mockStore({
  cart: []
});

const authValue = {
  user: {
    name: 'Utilisateur Test',
    email: 'test@example.com'
  }
};

test('affiche les routes publiques sans planter', () => {
  render(
    <Provider store={store}>
      <AuthProviderMock value={authValue}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProviderMock>
    </Provider>
  );
});
