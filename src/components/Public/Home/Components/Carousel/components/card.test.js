import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './card'; // Assurez-vous que le chemin est correct
import { addToCart } from '../../../../../../redux/cartSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('Card', () => {
  let store;

  beforeEach(() => {
    store = mockStore([]);
    store.dispatch = jest.fn();
  });

  const cardProps = {
    id: 1,
    image: 'https://via.placeholder.com/150',
    catetypeEpreuveg: 'Category 1',
    price: 100,
    title: 'Product 1',
    niveauEpreuve: 'Level 1',
    nameComplexe: 'Complexe 1',
    adressComplexe: 'Address 1',
    hallComplexe: 'Hall 1',
    numberPlace: 50,
    heureDebut: '10:00',
    tarifType: 'Type 1'
  };

  test('renders card with correct information', () => {
    render(
      <Provider store={store}>
        <Router>
          <Card {...cardProps} />
        </Router>
      </Provider>
    );

    // Vérifiez si le titre du produit est rendu
    expect(screen.getByText('Product 1')).toBeInTheDocument();

    // Vérifiez si le prix du produit est rendu
    expect(screen.getByText('$100(Type 1)')).toBeInTheDocument();

    // Vérifiez si l'image du produit est rendue
    const image = screen.getByAltText('Product 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('navigates to product details on image click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Card {...cardProps} />
        </Router>
      </Provider>
    );

    const image = screen.getByAltText('Product 1');
    fireEvent.click(image);

    // Vérifiez si la navigation a été déclenchée
    // Note: Vous pouvez ajouter plus de vérifications ici en utilisant un mock de useNavigate si nécessaire
  });

  test('dispatches addToCart action on button click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Card {...cardProps} />
        </Router>
      </Provider>
    );

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    // Vérifiez si l'action addToCart a été dispatchée
    expect(store.dispatch).toHaveBeenCalledWith(addToCart({
      id: 1,
      title: 'Product 1',
      image: 'https://via.placeholder.com/150',
      price: 100
    }));
  });
});
