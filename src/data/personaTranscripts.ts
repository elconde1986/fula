import type { PersonaId } from '../types';
import { persona1Transcript, persona1Agents } from './persona1';
import { persona2Transcript, persona2Agents } from './persona2';
import { persona3Transcript, persona3Agents } from './persona3';
import { persona4Transcript, persona4Agents } from './persona4';

export const personaTranscripts: Record<PersonaId, any> = {
  '1': persona1Transcript,
  '2': persona2Transcript,
  '3': persona3Transcript,
  '4': persona4Transcript,
};

export const personaAgents: Record<PersonaId, any> = {
  '1': persona1Agents,
  '2': persona2Agents,
  '3': persona3Agents,
  '4': persona4Agents,
};
