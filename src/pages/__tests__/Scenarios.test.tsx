import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Scenarios from '../Scenarios';
import { useFulaStore } from '../../store';

describe('Scenarios', () => {
  beforeEach(() => {
    useFulaStore.getState().resetSession();
  });

  it('renders scenario library', () => {
    render(
      <BrowserRouter>
        <Scenarios />
      </BrowserRouter>
    );
    const content = document.body.textContent || '';
    expect(content.length).toBeGreaterThan(0);
  });
});
