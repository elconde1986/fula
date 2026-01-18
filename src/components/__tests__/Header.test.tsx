import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { useFulaStore } from '../../store';

describe('Header', () => {
  beforeEach(() => {
    // Reset store before each test
    useFulaStore.getState().resetSession();
  });

  it('renders FULA logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const logo = screen.getByText('FULA');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    // Check if navigation exists (depends on your Navigation component)
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
