import { useNavigate, useLocation } from 'react-router-dom';
import { useFulaStore } from '../store';
import { personas } from '../data/personas';
import { scenarios } from '../data/scenarios';
import Navigation from './Navigation';
import { Sparkles, Copy, RotateCcw } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { personaId, scenarioId, tone, setTone, setPersona, setScenario, resetSession, messages, agentConsole, evidenceCards } = useFulaStore();
  
  const handleCopyTranscript = () => {
    
    let transcript = 'FULA SESSION TRANSCRIPT\n';
    transcript += '='.repeat(50) + '\n\n';
    
    // Add header info
    if (personaId) {
      const persona = personas.find((p) => p.id === personaId);
      if (persona) {
        transcript += `Persona: ${persona.name}\n`;
        transcript += `Tone: ${tone}\n`;
        if (scenarioId) {
          const scenario = scenarios.find((s) => s.id === scenarioId);
          if (scenario) {
            transcript += `Scenario: ${scenario.name}\n`;
          }
        }
        transcript += '\n' + '='.repeat(50) + '\n\n';
      }
    }
    
    // Add messages
    transcript += 'CONVERSATION:\n';
    transcript += '-'.repeat(50) + '\n\n';
    messages.forEach((msg) => {
      if (msg.type === 'advisor') {
        transcript += `[FULA — ADVISOR`;
        if (msg.data.severity) {
          transcript += ` — ${msg.data.severity}`;
        }
        transcript += ']\n';
        transcript += tone === 'friendly' ? msg.data.content.friendly : msg.data.content.direct;
        transcript += '\n\n';
      } else {
        transcript += '[USER]\n';
        transcript += msg.data.content;
        transcript += '\n\n';
      }
    });
    
    // Add agent console
    if (agentConsole.length > 0) {
      transcript += '\n' + '='.repeat(50) + '\n';
      transcript += 'AGENT CONSOLE:\n';
      transcript += '-'.repeat(50) + '\n\n';
      agentConsole.forEach((agent) => {
        transcript += `${agent.name} [${agent.status}]\n`;
        transcript += `  Input(s): ${agent.inputs}\n`;
        transcript += `  Computation(s): ${agent.computation}\n`;
        transcript += `  Output(s): ${agent.outputs}\n\n`;
      });
    }
    
    // Add evidence cards
    if (evidenceCards.length > 0) {
      transcript += '\n' + '='.repeat(50) + '\n';
      transcript += 'EVIDENCE CARDS:\n';
      transcript += '-'.repeat(50) + '\n\n';
      evidenceCards.forEach((card) => {
        transcript += `${card.title}:\n`;
        // Simple text representation of content
        if (typeof card.content === 'string') {
          transcript += card.content;
        } else {
          transcript += '[Visual evidence card]';
        }
        transcript += '\n\n';
      });
    }
    
    navigator.clipboard.writeText(transcript);
    alert('Transcript copied to clipboard');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar: Logo and Main Navigation */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FULA</h1>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <Navigation />
          </div>
        </div>

        {/* Session Controls Bar - Only show when in session or persona selected */}
        {(personaId || location.pathname.includes('/session')) && (
          <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Session:</span>
            </div>
            
            <select
              value={personaId || ''}
              onChange={(e) => {
                const id = e.target.value as any;
                setPersona(id);
                if (id && scenarioId) {
                  navigate(`/session/${id}/${scenarioId}`);
                }
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Persona</option>
              {personas.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1 bg-white">
              <button
                onClick={() => setTone('friendly')}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  tone === 'friendly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Friendly
              </button>
              <button
                onClick={() => setTone('direct')}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  tone === 'direct' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Direct
              </button>
            </div>

            <select
              value={scenarioId || ''}
              onChange={(e) => {
                const id = e.target.value as any;
                setScenario(id);
                if (personaId && id) {
                  navigate(`/session/${personaId}/${id}`);
                }
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Scenario</option>
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 ml-auto">
              {messages.length > 0 && (
                <button
                  onClick={handleCopyTranscript}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors flex items-center gap-2"
                  title="Copy Transcript"
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              )}
              
              <button
                onClick={() => {
                  resetSession();
                  navigate('/');
                }}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-sm transition-colors flex items-center gap-2"
                title="Reset Session"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
