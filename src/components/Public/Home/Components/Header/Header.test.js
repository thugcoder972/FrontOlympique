import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Header from './Header'; // Assurez-vous que le chemin est correct
import '@testing-library/jest-dom';

jest.mock('./mode1.jpg', () => 'mode1.jpg');
jest.mock('./model2.jpg', () => 'model2.jpg');
jest.mock('../Carousel/CarouselComp', () => () => <div>Carousel Component</div>);
jest.mock('./Feature', () => () => <div>Feature Component</div>);
jest.mock('../Products/Product_categories', () => () => <div>Product Categories Component</div>);

describe('Header', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('renders header components', () => {
    render(<Header />);

    // Vérifiez si le texte principal est rendu
    expect(screen.getByText('MAGINIFIQUE')).toBeInTheDocument();
    expect(screen.getByText('LES JEUX SONT LA')).toBeInTheDocument();

    // Vérifiez si les composants enfants sont rendus
    expect(screen.getByText('Feature Component')).toBeInTheDocument();
    expect(screen.getByText('Carousel Component')).toBeInTheDocument();
    expect(screen.getByText('Product Categories Component')).toBeInTheDocument();
  });

  test('renders price section correctly', async () => {
    render(<Header />);

    // Vérifiez si la section des prix est rendue
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('From'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('$30'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Shop'))).toBeInTheDocument();
    });
  });
});
