const API_URL = 'http://127.0.0.1:8000/api';

export const getTicketsByLevel = async (level) => {
    const response = await fetch(`${API_URL}/epreuves/by_level/?niveau_epreuve=${encodeURIComponent(level)}`);
    const data = await response.json();
    return data;
};
