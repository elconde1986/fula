import { describe, it, expect } from 'vitest';
import { calculateRunway, calculateTII, calculatePAWRatio } from '../calculators';
import type { AccountProfile } from '../../types';

describe('calculators', () => {
  const mockProfile: AccountProfile = {
    age: 40,
    pretaxIncome: 240000,
    monthlyBurn: 12500,
    checking: 18000,
    savings: 42000,
    brokerage: 160000,
    retirement: 210000,
    mortgagePITI: 5200,
    creditCardMins: 650,
    otherDebt: 500,
    netWorth: 520000,
    fixedCostRatio: 0.52,
  };

  describe('calculateRunway', () => {
    it('calculates runway correctly', () => {
      const runway = calculateRunway(mockProfile);
      const expected = (mockProfile.checking + mockProfile.savings) / mockProfile.monthlyBurn;
      expect(runway).toBe(expected);
      expect(runway).toBeCloseTo(4.8, 1);
    });
  });

  describe('calculateTII', () => {
    it('calculates Time Independence Index correctly', () => {
      const tii = calculateTII(mockProfile);
      const expected = (mockProfile.checking + mockProfile.savings + mockProfile.brokerage) / mockProfile.monthlyBurn;
      expect(tii).toBe(expected);
      expect(tii).toBeCloseTo(17.6, 1);
    });
  });

  describe('calculatePAWRatio', () => {
    it('returns correct ratio and label', () => {
      const result = calculatePAWRatio(mockProfile);
      expect(result).toHaveProperty('ratio');
      expect(result).toHaveProperty('label');
      expect(['PAW', 'Average', 'UAW']).toContain(result.label);
    });

    it('classifies as UAW when ratio < 0.5', () => {
      const lowWorthProfile = { ...mockProfile, netWorth: 100000 };
      const result = calculatePAWRatio(lowWorthProfile);
      expect(result.label).toBe('UAW');
    });
  });
});
