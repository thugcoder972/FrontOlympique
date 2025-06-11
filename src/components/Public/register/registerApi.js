export const registerUser = async (userData) => {
  try {
    console.log("Données reçues dans registerUser:", userData); // ← ajoute ce log

    // 🧪 Vérifie que userData contient bien les bons champs
    const { username, password, email, tel, type } = userData || {};

    if (!username || !password) {
      throw new Error("Le nom d'utilisateur et le mot de passe sont requis");
    }

    const response = await fetch('http://localhost:8081/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username.trim(),
        password,
        email,
        tel,
        type
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Erreur de parsing de la réponse JSON');
      }

      throw new Error(
        errorData?.message ||
        errorData?.detail ||
        `Échec de l'inscription (code ${response.status})`
      );
    }

    return await response.json();

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error.message);
    throw new Error(
      error.message.includes('Failed to fetch')
        ? 'Erreur réseau - vérifiez votre connexion'
        : error.message
    );
  }
};
