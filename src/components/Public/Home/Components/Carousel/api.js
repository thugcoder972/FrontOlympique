const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/epreuves/categories/`);
    const data = await response.json();
    return data;
};

export const getTicketsByCategory = async (category) => {
    const response = await fetch(`${API_URL}/tickets/by_category/?type_epreuve_sportive=${category}`);
    const data = await response.json();
    return data;
};

export const getTicketsByLevel = async (niveau) => {
    const response = await fetch(`https://backend-strapi.online/api.jeuxolympiques.com/api/epreuves/by_level/?niveau_epreuve=${niveau}`);
    const data = await response.json();
    return data;
  };