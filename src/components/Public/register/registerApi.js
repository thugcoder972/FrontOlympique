
const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return await response.json();
};
