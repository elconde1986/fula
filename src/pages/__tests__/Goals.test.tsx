import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Goals from '../Goals';
import { useFulaStore } from '../../store';

describe('Goals', () => {
  beforeEach(() => {
    useFulaStore.getState().resetSession();
  });

  it('renders goal setting wizard', () => {
    render(
      <BrowserRouter>
        <Goals />
      </BrowserRouter>
    );
    const content = document.body.textContent || '';
    expect(content.length).toBeGreaterThan(0);
  });
});
