import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import AuthContext, { AuthProvider } from './/authContext';

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('initializes with user from localStorage', () => {
    localStorage.setItem('access_token', 'test-token');
    
    const TestComponent = () => {
      const { user } = React.useContext(AuthContext);
      return <div>{user ? 'Logged in' : 'Logged out'}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('Logged in')).toBeInTheDocument();
  });

  test('logs in a user', async () => {
    const mockResponse = {
      access: 'new-access-token',
      refresh: 'new-refresh-token',
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const TestComponent = () => {
      const { user, login } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => login('username', 'password')}>Login</button>
          <div>{user ? 'Logged in' : 'Logged out'}</div>
        </div>
      );
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('Logged out')).toBeInTheDocument();

    act(() => {
      getByText('Login').click();
    });

    await waitFor(() => expect(getByText('Logged in')).toBeInTheDocument());
    expect(localStorage.getItem('access_token')).toBe('new-access-token');
    expect(localStorage.getItem('refresh_token')).toBe('new-refresh-token');
  });

  test('logs out a user', () => {
    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('refresh_token', 'test-refresh-token');

    const TestComponent = () => {
      const { user, logout } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={logout}>Logout</button>
          <div>{user ? 'Logged in' : 'Logged out'}</div>
        </div>
      );
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('Logged in')).toBeInTheDocument();

    act(() => {
      getByText('Logout').click();
    });

    expect(getByText('Logged out')).toBeInTheDocument();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
  });
});
