// src/components/Carousel/viewmodels/EpreuvesByCategoryViewModel.js

import { makeAutoObservable } from "mobx";

class EpreuvesByCategoryViewModel {
    tickets = [];
    loading = true;
    getTicketsByCategory;

    constructor(getTicketsByCategory) {
        makeAutoObservable(this);
        this.getTicketsByCategory = getTicketsByCategory;
    }

    async loadTickets(category) {
        try {
            this.tickets = await this.getTicketsByCategory(category);
        } catch (error) {
            console.error('Failed to load tickets:', error);
        } finally {
            this.loading = false;
        }
    }
}

export default EpreuvesByCategoryViewModel;
