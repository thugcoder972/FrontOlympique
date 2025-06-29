// src/components/Private/Profile/api.js

const BASE_URL = 'https://srv881328.hstgr.cloud/api';

export async function fetchUserProfile(token) {
  const response = await fetch(`${BASE_URL}/user-profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await response.json();
}

export async function updateUserProfile(token, userData) {
  const response = await fetch(`${BASE_URL}/user-profile/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`Failed to update profile: ${data.detail}`);
  }

  return await response.json();
}
