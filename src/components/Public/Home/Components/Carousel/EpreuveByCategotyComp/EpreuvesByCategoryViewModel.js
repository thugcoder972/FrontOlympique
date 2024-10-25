// src/components/Carousel/viewmodels/EpreuvesByCategoryViewModel.js
// src/components/Carousel/viewmodels/EpreuvesByCategoryViewModel.js
// src/components/Carousel/viewmodels/EpreuvesByCategoryViewModel.js

import { makeAutoObservable } from "mobx";
import { getTicketsByCategory } from '../carouselApi';

class EpreuvesByCategoryViewModel {
  tickets = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTickets(category) {
    this.loading = true;  // Assurez-vous que le chargement est défini sur true au début de la requête
    try {
      const ticketsData = await getTicketsByCategory(category);
      
      console.log('Received tickets data:', ticketsData);  // Log des données reçues
      
      // Directement assigner les données des tickets si c'est un tableau
      if (Array.isArray(ticketsData)) {
        this.tickets = ticketsData.map(ticketData => ({
          id: ticketData.id || null,
          imageUrl: ticketData.imageUrl || "default-image.jpg",
          nameEpreuveSportive: ticketData.nameEpreuveSportive || "Nom indisponible",
          typeEpreuveSportive: ticketData.typeEpreuveSportive || "Type inconnu",
          niveauEpreuve: ticketData.niveauEpreuve || "Niveau inconnu",
          hall: ticketData.hall || "Lieu inconnu",
          // Ajoutez d'autres champs si nécessaire
        }));
      } else {
        console.error('Unexpected format for tickets data:', ticketsData);
        this.tickets = [];
      }
      
    } catch (error) {
      console.error('Failed to load tickets:', error);
      this.tickets = [];
    } finally {
      this.loading = false;  // Fin du chargement
    }
  }
}

export default EpreuvesByCategoryViewModel;

