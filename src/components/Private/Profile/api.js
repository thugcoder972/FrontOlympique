// src/components/Private/Profile/api.js

export async function fetchUserProfile(token) {
    const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/user-profile/', {
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
    const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/user-profile/', {
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
  