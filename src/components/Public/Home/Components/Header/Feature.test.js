import React from 'react';
import { render, screen } from '@testing-library/react';
import Feature from './Feature'; // Assurez-vous que le chemin est correct
import '@testing-library/jest-dom';

describe('Feature', () => {
  test('renders feature items with correct text and icons', () => {
    render(<Feature />);

    // Vérifiez si le texte "FAST SECURE PAYMENTS" est rendu
    expect(screen.getByText('FAST SECURE PAYMENTS')).toBeInTheDocument();
    // Vérifiez si l'icône HiCash est rendue
    expect(screen.getByTestId('cash-icon')).toBeInTheDocument();

    // Vérifiez si le texte "PREMIUM PRODUCTS" est rendu
    expect(screen.getByText('PREMIUM PRODUCTS')).toBeInTheDocument();
    // Vérifiez si l'icône AiFillStar est rendue
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();

    // Vérifiez si le texte "FREE & FAST DELIVERY" est rendu
    expect(screen.getByText('FREE & FAST DELIVERY')).toBeInTheDocument();
    // Vérifiez si l'icône IoIosPaperPlane est rendue
    expect(screen.getByTestId('plane-icon')).toBeInTheDocument();
  });
});
