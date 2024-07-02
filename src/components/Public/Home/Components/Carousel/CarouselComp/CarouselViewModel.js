// src/components/Carousel/viewmodels/CarouselViewModel.js

import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from '../carouselApi';
import CategoryModel from '../../../../../../models/CategoryModel';

class CarouselViewModel {
  categories = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCategories() {
    try {
      const categoriesData = await getCategories();
      const categories = categoriesData.map(category => new CategoryModel(category));

      runInAction(() => {
        this.categories = categories;
        this.loading = false;
      });
    } catch (error) {
      console.error('Failed to load categories:', error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default CarouselViewModel;
