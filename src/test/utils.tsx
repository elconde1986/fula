import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useFulaStore } from '../store';

export function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
}

export function renderWithProviders(ui: React.ReactElement) {
  return renderWithRouter(ui);
}

// Helper to reset store state
export function resetStore() {
  const store = useFulaStore.getState();
  store.resetSession();
}
