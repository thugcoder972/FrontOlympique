// src/components/Carousel/api/carouselApi.js

const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

export async function getCategories() {
    return [
      { type_epreuve_sportive: 'Natation', image_url: 'https://cdn.pixabay.com/photo/2017/07/02/11/22/swimming-2464136_1280.jpg' },
      { type_epreuve_sportive: 'Athlétisme', image_url: 'https://cdn.pixabay.com/photo/2019/04/11/11/47/sport-4119570_1280.jpg' },
      { type_epreuve_sportive: 'Basket', image_url: 'https://cdn.pixabay.com/photo/2013/03/21/15/52/basketball-95607_1280.jpg' },
     
      { type_epreuve_sportive: 'Judo', image_url: 'https://cdn.pixabay.com/photo/2017/11/17/10/38/brazilian-jiu-jitsu-2957075_1280.jpg' },
      { type_epreuve_sportive: 'Boxe', image_url: 'https://cdn.pixabay.com/photo/2013/02/05/00/43/boxers-77966_1280.jpg' },
      { type_epreuve_sportive: 'Surf', image_url: 'https://cdn.pixabay.com/photo/2016/11/19/10/30/beach-1838501_1280.jpg' },
      { type_epreuve_sportive: 'Football', image_url: 'https://cdn.pixabay.com/photo/2020/01/12/16/57/stadium-4760441_1280.jpg' }
    ];
    

  }
  export const getTicketsByCategory = async (category) => {
    const response = await fetch(`http://localhost:8081/api/epreuves-sportives/filter-by-type?type=${category}`);  
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
