// src/components/Carousel/viewmodels/EpreuvesByCategoryViewModel.js

import { makeAutoObservable } from "mobx";
import { getTicketsByCategory } from '../carouselApi';
import { Ticket } from '../../../../../../models/TicketModel';


class EpreuvesByCategoryViewModel {
  tickets = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTickets(category) {
    try {
      const ticketsData = await getTicketsByCategory(category);
      console.log('Received tickets data:', ticketsData);  // Log des données reçues
      this.tickets = Array.isArray(ticketsData) ? ticketsData.map(ticketData => new Ticket(ticketData)) : [];
    } catch (error) {
      console.error('Failed to load tickets:', error);
    } finally {
      this.loading = false;
    }
  }
}

export default EpreuvesByCategoryViewModel;