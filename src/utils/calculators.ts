import type { AccountProfile } from '../types';

export function calculateRunway(profile: AccountProfile): number {
  const liquidAssets = profile.checking + profile.savings;
  return liquidAssets / profile.monthlyBurn;
}

export function calculateTII(profile: AccountProfile): number {
  const liquidAssets = profile.checking + profile.savings + profile.brokerage;
  return liquidAssets / profile.monthlyBurn;
}

export function calculateENW(profile: AccountProfile): number {
  return (profile.age * profile.pretaxIncome) / 10;
}

export function calculatePAWRatio(profile: AccountProfile): {
  ratio: number;
  label: 'UAW' | 'Average' | 'PAW';
} {
  const enw = calculateENW(profile);
  const ratio = profile.netWorth / enw;
  
  if (ratio < 0.5) return { ratio, label: 'UAW' };
  if (ratio <= 1.5) return { ratio, label: 'Average' };
  return { ratio, label: 'PAW' };
}

export function calculateOverlapRisk(profile: AccountProfile): {
  score: number;
  label: string;
} {
  const fixedCostRatio = profile.fixedCostRatio;
  const leverageRatio = (profile.mortgagePITI + profile.creditCardMins + profile.otherDebt) / profile.pretaxIncome;
  const liquidityThinness = (profile.checking + profile.savings) / profile.monthlyBurn;
  
  let score = 0;
  if (fixedCostRatio > 0.5) score += 25;
  if (leverageRatio > 0.3) score += 25;
  if (liquidityThinness < 6) score += 25;
  if (profile.brokerage / profile.netWorth > 0.4) score += 25;
  
  let label = 'Low';
  if (score >= 75) label = 'High';
  else if (score >= 50) label = 'Medium';
  
  return { score, label };
}
