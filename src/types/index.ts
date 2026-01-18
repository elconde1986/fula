export type Tone = 'friendly' | 'direct';

export type PersonaId = '1' | '2' | '3' | '4';

export type ScenarioId = 'freedom' | 'concentration' | 'liquidity' | 'audit';

export type Phase = 
  | '00-02' | '02-06' | '06-10' | '10-14' | '14-18' 
  | '18-22' | '22-25' | '25-28' | '28-30';

export type Severity = 'Low' | 'Medium' | 'High';

export interface TaxPosition {
  ticker: string;
  marketValue: number;
  costBasis: number;
  holdingPeriod: 'Short-term' | 'Long-term' | 'Mixed';
}

export interface TaxProfile {
  filingStatus: 'Single' | 'Married';
  state: string;
  marginalBracketLabel: string; // e.g., "Approx. High" or "Approx. Medium"
  taxablePositions: TaxPosition[];
  realizedGainsYTD: number;
  lossesYTD: number;
}

export interface AccountProfile {
  age: number;
  pretaxIncome: number;
  monthlyBurn: number;
  checking: number;
  savings: number;
  brokerage: number;
  retirement: number;
  mortgagePITI: number;
  creditCardMins: number;
  otherDebt: number;
  netWorth: number;
  fixedCostRatio: number;
  // For Persona 2
  illiquidEquity?: number;
  equityComp?: number;
  // Tax data
  taxProfile?: TaxProfile;
}

export interface Persona {
  id: PersonaId;
  name: string;
  descriptionFriendly: string;
  descriptionDirect: string;
  defaultTone: Tone;
  defaultScenario: ScenarioId;
  profile: AccountProfile;
}

export interface Scenario {
  id: ScenarioId;
  name: string;
  description: string;
}

export interface AgentStatus {
  name: string;
  status: 'Scanning' | 'Simulating' | 'Mapping' | 'Checking' | 'Projecting' | 'Estimating' | 'Flagging' | 'Completed';
  inputs: string;
  computation: string;
  outputs: string;
}

export interface CognitionBlock {
  signalsObserved: string[];
  dataUsed: string[];
  lensApplied: string;
  conclusion: string;
  confidenceCaveats: string;
}

export interface AdvisorMessage {
  id: string;
  content: {
    friendly: string;
    direct: string;
  };
  severity?: Severity;
  cognition?: CognitionBlock;
  hasFollowUps?: boolean;
  followUpButtons?: string[];
}

export interface UserMessage {
  id: string;
  content: string;
}

export type Message = 
  | { type: 'advisor'; data: AdvisorMessage }
  | { type: 'user'; data: UserMessage };

export interface EvidenceCard {
  id: string;
  title: string;
  content: any;
  phase: Phase;
}

export interface VisualExplainable {
  type: string;
  phase: Phase;
  data: any;
}

export interface SessionState {
  personaId: PersonaId | null;
  scenarioId: ScenarioId | null;
  tone: Tone;
  currentPhase: Phase;
  messages: Message[];
  agentConsole: AgentStatus[];
  evidenceCards: EvidenceCard[];
  visuals: VisualExplainable[];
  goals: string[];
}
