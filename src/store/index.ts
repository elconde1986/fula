import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  PersonaId, 
  ScenarioId, 
  Tone, 
  Phase, 
  SessionState,
  Message,
  AgentStatus,
  EvidenceCard,
  VisualExplainable 
} from '../types';

interface FulaStore extends SessionState {
  setPersona: (personaId: PersonaId) => void;
  setScenario: (scenarioId: ScenarioId) => void;
  setTone: (tone: Tone) => void;
  setPhase: (phase: Phase) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  updateAgentConsole: (agents: AgentStatus[]) => void;
  updateEvidenceCards: (cards: EvidenceCard[]) => void;
  updateVisuals: (visuals: VisualExplainable[]) => void;
  setGoals: (goals: string[]) => void;
  resetSession: () => void;
}

const initialState: SessionState = {
  personaId: null,
  scenarioId: null,
  tone: 'friendly',
  currentPhase: '00-02',
  messages: [],
  agentConsole: [],
  evidenceCards: [],
  visuals: [],
  goals: [],
};

export const useFulaStore = create<FulaStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPersona: (personaId) => set({ personaId }),
      setScenario: (scenarioId) => set({ scenarioId }),
      setTone: (tone) => set({ tone }),
      setPhase: (phase) => set({ currentPhase: phase }),
      addMessage: (message) => 
        set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (messages) => set({ messages }),
      updateAgentConsole: (agents) => set({ agentConsole: agents }),
      updateEvidenceCards: (cards) => set({ evidenceCards: cards }),
      updateVisuals: (visuals) => set({ visuals }),
      setGoals: (goals) => set({ goals }),
      resetSession: () => set(initialState),
    }),
    {
      name: 'fula-storage',
    }
  )
);
