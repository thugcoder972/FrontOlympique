const API_URL = 'http://127.0.0.1:8000/api';

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