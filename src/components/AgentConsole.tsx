import { Cpu, Search, Brain, MapPin, TrendingUp, Radio, Calculator } from 'lucide-react';
import type { AgentStatus } from '../types';

interface Props {
  agents: AgentStatus[];
}

const statusColors: Record<string, string> = {
  Scanning: 'bg-blue-100 text-blue-800 border-blue-200',
  Simulating: 'bg-purple-100 text-purple-800 border-purple-200',
  Mapping: 'bg-orange-100 text-orange-800 border-orange-200',
  Checking: 'bg-amber-100 text-amber-800 border-amber-200',
  Projecting: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Estimating: 'bg-teal-100 text-teal-800 border-teal-200',
  Flagging: 'bg-rose-100 text-rose-800 border-rose-200',
  Completed: 'bg-gray-100 text-gray-800 border-gray-200',
};

const agentIcons: Record<string, any> = {
  'Profile Analyzer': Search,
  'Liquidity Sentinel': Radio,
  'Risk Correlation Mapper': MapPin,
  'Behavioral Auditor': Brain,
  'Freedom Optimizer': TrendingUp,
  'Correlation Mapper': MapPin,
  'Tax Strategist': Calculator,
};

export default function AgentConsole({ agents }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm">WHAT MY AGENTS ARE DOING RIGHT NOW</h3>
      </div>
      
      <div className="space-y-3">
        {agents.map((agent, i) => {
          const Icon = agentIcons[agent.name] || Cpu;
          return (
            <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-sm text-gray-900">{agent.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[agent.status]}`}>
                  {agent.status}
                </span>
              </div>
              <div className="text-xs text-gray-600 space-y-1.5 ml-6">
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-700 min-w-[70px]">Input(s):</span>
                  <span className="text-gray-600">{agent.inputs}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-700 min-w-[70px]">Compute:</span>
                  <span className="text-gray-600">{agent.computation}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-700 min-w-[70px]">Output(s):</span>
                  <span className="text-gray-600">{agent.outputs}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
