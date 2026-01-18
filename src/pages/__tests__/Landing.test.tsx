import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../Landing';
import { useFulaStore } from '../../store';

describe('Landing', () => {
  beforeEach(() => {
    useFulaStore.getState().resetSession();
  });

  it('renders FULA title', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    const title = screen.getByText(/FULA/i);
    expect(title).toBeInTheDocument();
  });

  it('renders persona cards', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    // Check for persona names
    expect(screen.getByText(/Self-Aware High Earner/i)).toBeInTheDocument();
    expect(screen.getByText(/Concentrated Risk Taker/i)).toBeInTheDocument();
  });
});
