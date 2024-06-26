// src/components/Carousel/viewmodels/CarouselViewModel.js

import { makeAutoObservable } from "mobx";

class CarouselViewModel {
    categories = [];
    loading = true;
    getCategories;

    constructor(getCategories) {
        makeAutoObservable(this);
        this.getCategories = getCategories;
    }

    async loadCategories() {
        try {
            this.categories = await this.getCategories();
        } catch (error) {
            console.error('Failed to load categories:', error);
        } finally {
            this.loading = false;
        }
    }
}

export default CarouselViewModel;
