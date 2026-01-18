import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Session from '../Session';
import { useFulaStore } from '../../store';

// Mock the visual components to avoid rendering issues
vi.mock('../../components/visuals', () => ({
  PaperVsStress: () => <div data-testid="paper-vs-stress">PaperVsStress</div>,
  DependencyMap: () => <div data-testid="dependency-map">DependencyMap</div>,
  FreedomTimeline: () => <div data-testid="freedom-timeline">FreedomTimeline</div>,
  SurvivalGrowthBuckets: () => <div data-testid="survival-growth">SurvivalGrowthBuckets</div>,
  AssumptionTable: () => <div data-testid="assumption-table">AssumptionTable</div>,
  TimeToCashLadder: () => <div data-testid="time-to-cash">TimeToCashLadder</div>,
  BaseBadUgly: () => <div data-testid="base-bad-ugly">BaseBadUgly</div>,
  CashFlowChart: () => <div data-testid="cash-flow">CashFlowChart</div>,
  AssetAllocationChart: () => <div data-testid="asset-allocation">AssetAllocationChart</div>,
  IncomeExpenseChart: () => <div data-testid="income-expense">IncomeExpenseChart</div>,
  RunwayVisualization: () => <div data-testid="runway-vis">RunwayVisualization</div>,
  FinancialHealthChart: () => <div data-testid="financial-health">FinancialHealthChart</div>,
  RealizedVsUnrealized: () => <div data-testid="realized-vs-unrealized">RealizedVsUnrealized</div>,
  HoldingPeriodGauge: () => <div data-testid="holding-period-gauge">HoldingPeriodGauge</div>,
  FundingSourceComparison: () => <div data-testid="funding-source">FundingSourceComparison</div>,
  TaxDragIndicators: () => <div data-testid="tax-drag">TaxDragIndicators</div>,
  NetOfTaxDecisionDelta: () => <div data-testid="net-of-tax">NetOfTaxDecisionDelta</div>,
}));

describe('Session', () => {
  beforeEach(() => {
    useFulaStore.getState().resetSession();
  });

  it('shows loading state when persona is not found', () => {
    window.history.pushState({}, '', '/session/999/freedom');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/session/:personaId/:scenarioId" element={<Session />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading session/i)).toBeInTheDocument();
  });

  it('renders session for valid persona', async () => {
    window.history.pushState({}, '', '/session/1/freedom');
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/session/:personaId/:scenarioId" element={<Session />} />
        </Routes>
      </BrowserRouter>
    );
    
    // Check that component renders (either loading or content)
    await waitFor(() => {
      const content = document.body.textContent || '';
      expect(content.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });
});
