import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Card from './Card';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Card Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: [],
    });
    store.dispatch = jest.fn();
  });

  const cardProps = {
    id: 1,
    image: 'image-url.jpg',
    catetypeEpreuveg: 'category1',
    price: 100,
    title: 'Sample Title',
    niveauEpreuve: 'level1',
    nameComplexe: 'Complex Name',
    adressComplexe: 'Address',
    hallComplexe: 'Hall',
    numberPlace: 100,
    heureDebut: '10:00 AM',
    tarifType: 'Standard',
  };

  test('renders card with provided props', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...cardProps} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(screen.getByText('$100 Standard')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'image-url.jpg');
  });

  test('navigates to details page on image click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...cardProps} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByAltText(''));
    expect(mockNavigate).toHaveBeenCalledWith('/DetailsProducts', {
      state: { ...cardProps },
    });
  });

  test('dispatches addToCart action on button click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...cardProps} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: {
        id: 1,
        title: 'Sample Title',
        image: 'image-url.jpg',
        price: 100,
      },
    });
  });
});
