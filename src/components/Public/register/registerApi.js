


export const registerUser = async (userData) => {
  const response = await fetch('http://localhost:8081/api/epreuves-sportives//register/', {
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
