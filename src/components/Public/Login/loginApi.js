const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export const loginApi = async (user, authContext) => {
  try {
    const body = JSON.stringify({
      username: user.username,
      password: user.password,
    });

    console.log('Sending login request with body:', body);

    const response = await fetch(`${API_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error response:', errorData);
      throw new Error(errorData.detail || 'Failed to login');
    }

    const data = await response.json();
    authContext.setUser({ token: data.access });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
  
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};
