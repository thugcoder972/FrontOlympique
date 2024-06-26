// src/components/Carousel/api/carouselApi.js

const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/epreuves/categories/`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

export const getTicketsByCategory = async (category) => {
    const response = await fetch(`${API_URL}/tickets/by_category/?type_epreuve_sportive=${category}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tickets by category');
    }
    return await response.json();
};

export const getTicketsByLevel = async (niveau) => {
    const response = await fetch(`${API_URL}/epreuves/by_level/?niveau_epreuve=${niveau}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tickets by level');
    }
    return await response.json();
};
