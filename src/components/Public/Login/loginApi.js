export const loginApi = async (user, authContext) => {
  try {
    // Validation des entrées
    if (!user?.username || !user?.password) {
      throw new Error('Username and password are required');
    }

    const body = JSON.stringify({
      username: user.username.trim(),
      password: user.password,
    });

    console.log('Sending login request for user:', user.username);

    // Correction du double slash dans l'URL
    const response = await fetch('http://31.97.142.99:8081/api/epreuves-sportives/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('Login error response:', errorData);
      } catch (e) {
        console.error('Failed to parse error response');
      }
      
      throw new Error(
        errorData?.detail || 
        errorData?.message || 
        `Login failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    // Validation de la réponse
    if (!data.access) {
      throw new Error('No access token received');
    }

    // Stockage sécurisé
    try {
      authContext.setUser({ 
        token: data.access,
        refreshToken: data.refresh,
        username: user.username
      });
      
      localStorage.setItem('access_token', data.access);
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
    } catch (storageError) {
      console.error('Storage error:', storageError);
      throw new Error('Failed to save authentication data');
    }

    return { success: true, username: user.username };

  } catch (error) {
    console.error('Login error:', error.message);
    
    // Nettoyage en cas d'erreur
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    authContext.setUser(null);
    
    throw error;
  }
};