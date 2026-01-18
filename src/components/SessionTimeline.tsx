import { Clock } from 'lucide-react';
import type { Phase } from '../types';

interface Props {
  currentPhase: Phase;
  onPhaseChange: (phase: Phase) => void;
}

const phases: { id: Phase; label: string; description: string }[] = [
  { id: '00-02', label: '00–02', description: 'Session Framing' },
  { id: '02-06', label: '02–06', description: 'Reality Snapshot' },
  { id: '06-10', label: '06–10', description: 'Directional Progress' },
  { id: '10-14', label: '10–14', description: 'Blind Spots' },
  { id: '14-18', label: '14–18', description: 'Monte Carlo (Failure Paths)' },
  { id: '18-22', label: '18–22', description: "Devil's Advocate / Talk Me Out Of It" },
  { id: '22-25', label: '22–25', description: 'Conditions to Proceed' },
  { id: '25-28', label: '25–28', description: 'Liquidity Crisis Drill' },
  { id: '28-30', label: '28–30', description: 'Advisor Stance + Next Review Triggers' },
];

export default function SessionTimeline({ currentPhase, onPhaseChange }: Props) {
  const currentIndex = phases.findIndex((p) => p.id === currentPhase);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">Session Timeline</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {phases.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isPast = index < currentIndex;
          
          return (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all hover:scale-105 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                  : isPast
                  ? 'bg-gray-100 text-gray-700 border-gray-300'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
              title={phase.description}
            >
              {phase.label}
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-xs font-medium text-blue-900">{phases[currentIndex]?.description}</p>
      </div>
    </div>
  );
}
