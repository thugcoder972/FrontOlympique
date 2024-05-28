import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, addToCart, incrementQuantity, decrementQuantity, removeItem, clearCart } from './cartSlice';

describe('cartSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { cart: cartReducer } });
  });

  test('should handle initial state', () => {
    const state = store.getState().cart;
    expect(state.cart).toEqual([]);
  });

  test('should handle addToCart', () => {
    store.dispatch(addToCart({ id: 1, name: 'Product 1' }));
    const state = store.getState().cart;
    expect(state.cart).toEqual([{ id: 1, name: 'Product 1', quantity: 1 }]);
  });

  test('should handle incrementQuantity', () => {
    store.dispatch(addToCart({ id: 1, name: 'Product 1' }));
    store.dispatch(incrementQuantity(1));
    const state = store.getState().cart;
    expect(state.cart).toEqual([{ id: 1, name: 'Product 1', quantity: 2 }]);
  });

  test('should handle decrementQuantity', () => {
    store.dispatch(addToCart({ id: 1, name: 'Product 1' }));
    store.dispatch(incrementQuantity(1));
    store.dispatch(decrementQuantity(1));
    const state = store.getState().cart;
    expect(state.cart).toEqual([{ id: 1, name: 'Product 1', quantity: 1 }]);
  });

  test('should handle removeItem', () => {
    store.dispatch(addToCart({ id: 1, name: 'Product 1' }));
    store.dispatch(removeItem(1));
    const state = store.getState().cart;
    expect(state.cart).toEqual([]);
  });

  test('should handle clearCart', () => {
    store.dispatch(addToCart({ id: 1, name: 'Product 1' }));
    store.dispatch(addToCart({ id: 2, name: 'Product 2' }));
    store.dispatch(clearCart());
    const state = store.getState().cart;
    expect(state.cart).toEqual([]);
  });
});
